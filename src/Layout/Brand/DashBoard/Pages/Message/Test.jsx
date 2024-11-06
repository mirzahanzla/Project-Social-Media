// eslint-disable-next-line no-unused-vars
import React from 'react';

function Test({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleSendGroupMessage,
  messagesEndRef,
  loggedInUserId,
  groupId,  // Assuming groupId is passed as a prop
}) {
  // Enhanced formatTime function to handle both time and date display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", timestamp);
      return "Invalid Time"; // Fallback for invalid timestamps
    }

    const today = new Date();
    const isSameDay = today.toDateString() === date.toDateString();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    // If the message was sent today, show only time, otherwise show the date
    if (isSameDay) {
      return `${hours}:${minutes} ${ampm}`;
    } else {
      return `${date.toDateString()} ${hours}:${minutes} ${ampm}`;
    }
  };

  // Handle sending message logic based on groupId
  const handleSend = () => {
    if (groupId) {
      // If there is a groupId, send as a group message
      handleSendGroupMessage(groupId, newMessage);
    } else {
      // Otherwise, send as a normal message
      handleSendMessage(newMessage);
    }
    setNewMessage(""); // Clear the input after sending the message
  };

  return (
    <>
      {/* Container for the message list */}
      <div className="overflow-y-auto h-[350px] sm:h-[450px] p-2 rounded-lg bg-[#F3F3F3] border border-gray-300">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => {
            // Determine alignment based on sender and receiver IDs
            const isSameUser =
              msg.sender === loggedInUserId && msg.receiver === loggedInUserId;
            const justifyClass =
              isSameUser || msg.sender === loggedInUserId
                ? "justify-end"
                : "justify-start";
            const messageClass = isSameUser
              ? "bg-blue-500 text-white" // Style for messages sent by the user to themselves
              : msg.sender === loggedInUserId
              ? "sent bg-orange-500 text-white"
              : "received bg-gray-300 text-black";

            return (
              <div key={index} className={`flex ${justifyClass}`}>
                <div className={`message ${messageClass} p-2 rounded-lg mb-2`}>
                  <p>{msg.text}</p>
                  <p className="text-xs text-black-500">
                    {formatTime(msg.createdAt || msg.timestamp)}{" "}
                    {/* Use createdAt if available */}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
        {/* Scroll to the latest message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area for new messages */}
      <div className="flex mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-2"
        />
        <img
          src="/Svg/Send.svg"
          className="cursor-pointer"
          onClick={handleSend}  // Use handleSend to check if it's a group or regular message
          alt="Send"
        />
      </div>
    </>
  );
}

// Export the component
export default Test;
