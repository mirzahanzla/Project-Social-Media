// Import useNavigate for navigation
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import for navigation
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import axios from 'axios';
// import { Admin } from 'mongodb';

const CreateGroupPage = () => {
  const [groupTitle, setGroupTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [memberError, setMemberError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate(); // initialize navigate






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








  const handleSearch = debounce(async () => {
    if (!searchQuery.trim()) {
      resetSearch();
      return;
    }

    setIsSearching(true);
    resetSearch();

    try {
      const response = await axios.get(`/api/users/search`, {
        params: { query: searchQuery },
        cancelToken: new axios.CancelToken((c) => (window.cancelRequest = c)),
      });

      if (response.data.length === 0) {
        setErrorMessage('User not found');
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error searching for users:', error);
      setErrorMessage('Error fetching search results.');
    } finally {
      setIsSearching(false);
    }
  }, 500);


  
  const resetSearch = () => {
    setSearchResults([]);
    setErrorMessage('');
  };

  useEffect(() => {
    handleSearch();
    return () => {
      if (window.cancelRequest) window.cancelRequest();
    };
  }, [searchQuery]);

  const addMember = (member) => {
    if (members.length < 7 && !members.some((m) => m._id === member._id)) {
      setMembers((prevMembers) => [...prevMembers, member]);
      resetSearch();
      setSearchQuery('');
      setMemberError(''); // Clear error if a member is successfully added
    }
  };

  const removeMember = (memberId) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberId));
  };

  const handleCreateGroup = async () => {
    // Validation for group title and members count
    if (!groupTitle.trim()) {
      setTitleError('Group title is required.');
      return;
    } else if (groupTitle.length < 8) {
      setTitleError('Group title must be at least 8 characters.');
      return;
    } else {
      setTitleError('');
    }

    if (members.length < 2) {
      setMemberError('At least 2 members are required to create a group.');
      return;
    } else {
      setMemberError('');
    }

    // Proceed only if there are no errors
    if (!titleError && !memberError && groupTitle.trim() && members.length >= 2) {
      try {
        // API call to create group
        const response = await axios.post('/api/groups/create', {
          title: groupTitle,
          admin:loggedInUserId,
          members: members.map((member) => member._id),
        });

        const groupId = response.data.groupId;
      console.log('Group created successfully:', { groupTitle, members });

      // Navigate back to Message component with newGroupId in state
      navigate('/message', { state: { newGroupId: groupId } });
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
        <h2 className="text-lg font-semibold mb-4">Create Group</h2>

        {/* Group Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Group Title</label>
          <input
            type="text"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter Group Title"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>

        {/* Member Search */}
        <h3 className="text-sm font-medium text-gray-700 mb-2">Add Member:</h3>
        <div className="relative mb-4">
          <input
            type="text"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && <p>Loading...</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
          {searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md z-10">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addMember(user)}
                >
                  <span>{user.fullName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Added Members */}
        <div className="flex flex-wrap gap-2 mb-4">
          {members.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center bg-gray-200 p-2 rounded-md shadow-md"
            >
              <span className="mr-2">{member.fullName}</span>
              <button
                className="text-red-500 hover:bg-red-200 rounded-full p-1"
                onClick={() => removeMember(member._id)}
              >
                &times;
              </button>
            </motion.div>
          ))}
        </div>
        {memberError && <p className="text-red-500 text-sm mb-4">{memberError}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-md border border-gray-300"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-green-500 text-white"
            onClick={handleCreateGroup}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
