import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import InfluncerMessage from "./InfluencerMessage";
import GroupChat from "./GroupChat";
import Test from "./Test"; // Adjust the path accordingly
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const Message = () => {
  const [ShowMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [chats, setChats] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserImage, setSelectedUserImage] = useState("");
  // const location = useLocation(); // Retrieve location state
  const [userStatus, setUserStatus] = useState({});

  const [groups, setGroups] = useState([]);
  // const newGroupId = location.state?.newGroupId;
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // const [recentChats, setRecentChats] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [selectedUserName, setSelectedUserName] = useState(""); // New state to hold the selected user's name
  const [selectedChatId, setSelectedChatId] = useState(null); // Store the selected chat's ID

  // Function to generate chatId based on the sender and receiver IDs
  const generateChatId = (senderId, receiverId) => {
    return [senderId, receiverId].sort().join("-"); // This ensures consistency between users
  };

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    const userId = loggedInUserId;
    if (userId) {
      socketRef.current.emit("join", userId);
      socketRef.current.emit("userOnline", userId); // Notify server of user online status
    }

    // // Socket listener to handle real-time incoming messages
    // socketRef.current.on("receiveMessage", (data) => {
    //   if (data.chatId === selectedChatId) {
    //     setMessages((prevMessages) => [...prevMessages, data]);
    //   } else {
    //     console.log("Message belongs to a different chat, ignoring.");
    //   }
    // });

    socketRef.current.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);

      // Update the recent chats list or contacts list dynamically
      setContacts((prevContacts) => {
        const existingContact = prevContacts.find(
          (contact) => contact._id === data.sender
        );
        if (!existingContact) {
          return [
            { _id: data.sender, fullName: data.senderName },
            ...prevContacts,
          ];
        }
        return prevContacts;
      });
    });

    // Listen for online status updates
    socketRef.current.on("userOnline", (userId) => {
      setUserStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: true,
      }));
    });

    socketRef.current.on("userOffline", (userId) => {
      setUserStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: false,
      }));
    });

    // Handle group message updates
    socketRef.current.on("receiveGroupMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Handle connection error
    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Handle disconnection
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [loggedInUserId, selectedChatId]);

  const LoadingSpinner = () => (
    <div className="flex justify-center mt-5">
      <div
        style={{
          border: "4px solid #f3f3f3",
          borderRadius: "50%",
          borderTop: "4px solid #3498db",
          width: "30px",
          height: "30px",
          animation: "spin 2s linear infinite",
        }}
      ></div>
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}
      </style>
    </div>
  );

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("/auth/getLoggedInUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setLoggedInUserId(response.data._id);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      const fetchContacts = async () => {
        try {
          const response = await axios.get(
            `/api/messages/messages/contacts/${loggedInUserId}`
          );
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };
      fetchContacts();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    // Skip fetching if user ID is not available
    if (!loggedInUserId) return;

    const fetchGroups = async () => {
      setIsLoading(true); // Start loading before API call
      try {
        const response = await axios.get(`/api/groups/${loggedInUserId}`);
        setGroups(response.data.groups || []); // `response.data.groups` should contain the groups array
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false); // Stop loading after API call
      }
    };

    // Fetch groups only if loggedInUserId has changed
    fetchGroups();
  }, [loggedInUserId]);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [selectedGroup] = useState(null);

  // const toggleGroupOptions = (group) => {
  //   setSelectedGroup(group); // Set the selected group
  //   setShowGroupOptions(!showGroupOptions); // Toggle the visibility of the popup
  // };

  const modifyGroup = async (groupId) => {
    try {
      const updatedGroup = {
        title: "Updated Group Name", // New group name or other data
        // Add other fields if needed
      };

      const response = await axios.put(
        `/api/groups/${groupId}/modify`,
        updatedGroup
      );
      console.log("Group modified:", response.data);

      //   // Update local state with the updated group
      //   setGroups((prevGroups) =>
      //     prevGroups.map((group) =>
      //       group._id === groupId ? { ...group, ...updatedGroup } : group
      //     )
      //   );
    } catch (error) {
      console.error("Error modifying group:", error);
    }
  };

  const deleteGroup = async (groupId) => {
    // Remove the group from the state
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group._id !== groupId)
    );
  };

  const handleSelectGroup = async (group) => {
    setSelectedMember(group._id);
    setSelectedUserName(group.title);
    setShowMessage(true);

    const chatId = group._id; // Assuming each group has a unique ID as chatId
    setSelectedChatId(chatId);

    try {
      const response = await axios.get(`/api/messages/group/${chatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching group messages:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      // Existing code to fetch contacts or groups
    };

    fetchContacts();
  }, []);

  // Debounced search function
  const handleSearch = debounce(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); // Clear results if query is empty
      setErrorMessage("");
      return;
    }

    setIsSearching(true);
    setIsLoading(true);
    setSearchResults([]); // Clear previous results on new search
    setErrorMessage("");

    try {
      const response = await axios.get(`/api/users/search`, {
        params: { query: searchQuery },
        cancelToken: new axios.CancelToken((c) => (window.cancelRequest = c)),
      });

      if (response.data.length === 0) {
        setErrorMessage("User not found");
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
      setErrorMessage("Error fetching search results.");
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  }, 500); // Debounce delay in milliseconds (500 ms)

  // Trigger handleSearch whenever searchQuery changes
  useEffect(() => {
    handleSearch();

    // Cancel the previous request if the searchQuery changes before completion
    return () => {
      if (window.cancelRequest) window.cancelRequest();
    };
  }, [searchQuery]); // Only re-run if searchQuery changes

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Generate chat ID if not already set
      const chatId =
        selectedChatId || generateChatId(loggedInUserId, selectedMember);

      const messageToSend = {
        text: newMessage,
        sender: loggedInUserId,
        receiver: selectedMember,
        chatId: chatId,
        timestamp: new Date().toISOString(),
      };

      console.log("Sender ID:", loggedInUserId);
      console.log("Receiver ID:", selectedMember);
      console.log("Chat ID:", chatId);
      console.log("Sending Message:", messageToSend);

      try {
        // Emit the message to the server
        socketRef.current.emit("sendMessage", messageToSend);

        // Update local state to display the sent message
        setMessages((prevMessages) => [...prevMessages, messageToSend]);
        setNewMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("Cannot send an empty message");
    }
  };

  const handleSelectMember = (user) => {
    const userId = user._id || user.id;
    if (!userId) return;

    const chatId = generateChatId(loggedInUserId, userId);
    setSelectedMember(userId);
    setSelectedUserName(user.fullName || "");
    setSelectedUserImage(user.photo || "");
    setSelectedChatId(chatId);
    setShowMessage(true);

    if (!contacts.some((contact) => contact._id === user._id)) {
      setContacts((prevContacts) => [user, ...prevContacts]);
    }

    socketRef.current.emit("leaveChat", selectedChatId); // Leave the previous chat
    socketRef.current.emit("joinChat", { chatId }); // Join the new chat

    if (chats[chatId]) {
      setMessages(chats[chatId]);
    } else {
      setMessages([]);
      fetchMessagesForChat(chatId, userId);
    }
  };

  const fetchMessagesForChat = async (chatId, userId) => {
    if (!chatId || !userId) {
      console.error("fetchMessagesForChat: chatId or userId is undefined");
      return;
    }

    try {
      const response = await axios.get(
        `/api/messages/chat/${chatId}?userId=${userId}`
      );
      console.log("Chat ID:", chatId);
      console.log("User ID:", userId);

      if (Array.isArray(response.data)) {
        setMessages(response.data);
        setChats((prevChats) => ({
          ...prevChats,
          [chatId]: response.data,
        }));
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching messages for chat:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white h-screen text-[9px] xs:text-[10px] sm:text-[13px] md:text-[14px]">
      <div className="sm:grid sm:grid-cols-12 mdm:w-[800px] lg:w-[1000px] mx-auto">
        {/* Left Side - Search Users */}
        <div className="col-span-4 border-r-[1px] pr-2 h-screen ml-2">
          {/* Search Bar Section */}
          <div className="flex justify-center mt-5 sm:justify-between items-center">
            <div>
              <div className="flex items-center w-[250px] sm:w-[180px] mdm:w-[200px] lg:w-[250px] relative">
                <img
                  className="size-[20px] absolute top-3 left-2 cursor-pointer"
                  src="/Svg/SearchIcon.svg"
                  alt="Search"
                  onClick={handleSearch}
                />
                <input
                  className="outline-0 bg-none w-full h-[40px] bg-black/5 rounded-lg pl-9"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                />
              </div>
              {/* Error and Loading Display */}
              {errorMessage && (
                <p className="text-center text-red-500 mt-4">{errorMessage}</p>
              )}
              {isLoading && <LoadingSpinner />}
            </div>
            {/* Create Group Button */}
            <Link to="/create-group">
              <div className="OrangeButtonWithText-v3 fixed bottom-10 right-10 sm:relative flex items-center cursor-pointer justify-center">
                <p className="text-2xl">+</p>
              </div>
            </Link>
          </div>

          {/* Search Results Section */}
          {isSearching ? (
            <div className="flex justify-center items-center mt-5">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleSelectMember(user)}
                    className="cursor-pointer"
                  >
                    <InfluncerMessage
                      Image={user.photo}
                      Name={user.fullName}
                      Time={userStatus[user._id] ? "Online" : "Offline"}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500"></p>
              )}
            </div>
          )}

          {/* Members Section */}
          <div className="ml-10 mr-2 mt-5">
            <p className="poppins-semibold text-[15px]">Chats</p>
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => handleSelectMember(contact)}
                  className="cursor-pointer"
                >
                  <InfluncerMessage
                    Image={contact.photo}
                    Name={contact.fullName}
                    Time={userStatus[contact._id] ? "Online" : "Offline"}
                  />
                </div>
              ))
            ) : (
              <p>No members found</p>
            )}
          </div>

          {showGroupOptions && selectedGroup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <p>Edit Group</p>
                <p>Delete Group</p>
                <p onClick={() => setShowGroupOptions(false)}>Close</p>
              </div>
            </div>
          )}

          {/* Groups Section */}
          <div className="mt-5 ml-10 mr-2">
            <p className="poppins-semibold text-[15px]">Groups</p>
            {groups && groups.length > 0 ? (
              groups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => handleSelectGroup(group)}
                  className="cursor-pointer"
                >
                  <GroupChat
                    groupId={group._id} // Pass group ID
                    Image={group.photo} // Group image
                    Name={group.title} // Group name
                    // Unread={group.unreadMessages} // Unread messages count
                    onClick={() => handleSelectGroup(group)} // Group click handler
                    onDelete={() => deleteGroup(group._id)} // Delete group handler
                    onModify={() => modifyGroup(group._id)} // Delete group handler
                  />
                </div>
              ))
            ) : (
              <p>No groups found</p>
            )}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className={`col-span-8 ${ShowMessage ? "block" : "hidden"}`}>
          {ShowMessage ? (
            <div className="mx-2 relative">
              {selectedChatId ? ( // Check if chatId exists
                <>
                  <div className="flex text-[9px] sm:text-[10px] mdm:text-[12px]">
                    <div
                      className="flex mr-4 sm:hidden"
                      onClick={() => setShowMessage(false)}
                    >
                      <img src="/Svg/Back.svg" alt="Back" />
                    </div>
                    <img
                      className="size-[40px] Avatar"
                      src={selectedUserImage || "/path/to/default/image.jpg"} // Fallback image
                      alt={selectedMember}
                    />

                    <div className="flex flex-1 flex-col ml-2">
                      <p className="poppins-semibold">
                        {selectedUserName || "Unknown User"}
                      </p>
                      <p
                        className={`text-[10px] ${
                          userStatus[selectedMember]
                            ? "text-green-500 font-bold"
                            : "text-black/70 font-bold"
                        }`}
                      >
                        {userStatus[selectedMember] ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <Test
                    messages={messages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                    messagesEndRef={messagesEndRef}
                    loggedInUserId={loggedInUserId} // Pass the logged-in user ID
                    selectedMember={selectedMember} // Pass the selected member's ID (receiver ID)
                  />
                </>
              ) : (
                // Show refresh message if chatId is missing
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg text-red-500 font-semibold">
                    Chat ID not found. Please refresh the page.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col p-4">
              <h2 className="text-lg font-bold">Recent Chats</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
