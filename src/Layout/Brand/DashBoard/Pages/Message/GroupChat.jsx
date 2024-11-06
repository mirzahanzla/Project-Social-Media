// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from "axios";
const GroupChat = ({ groupId, Image, Name, Message, Unread, onClick,onDelete,onModify}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 console.log("printed",groupId);

 

  const deleteGroup = async (groupId) => {
    try {
        console.log("Group deleted:", groupId);
        const response = await axios.delete(`/api/groups/group/delete/${groupId}`);

      console.log("Group deleted:", response.data);
      onDelete(groupId); // Pass the groupId to the delete function
  
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };


  const handleMenuToggle = (e) => {
    e.stopPropagation(); // Prevent triggering onClick
    setIsMenuOpen(!isMenuOpen);
  };

  const handleModifyClick = () => {
    onModify(groupId); // Pass the groupId to the modify function
    setIsMenuOpen(false);
  };


  return (
    <div
      className={`flex items-center border-b-[1px] border-black/10 py-3 cursor-pointer ${isHovered ? 'bg-black/10' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Trigger the passed onClick function
    >
      <img src={Image} alt={Name} className="size-[40px] Avatar" />
      <div className="flex flex-1 flex-col ml-3">
        <div className="flex justify-between items-center">
          <p className="poppins-semibold text-[12px]">{Name}</p>
          <div className="relative menu-container">
            <button onClick={handleMenuToggle} className=" menu-icon ">
              &#x22EE; {/* Three vertical dots */}
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-blue border border-gray-300 rounded shadow-md z-10">
                <button 
                  onClick={handleModifyClick}
                  
                  className=" block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                >
                  Modify
                </button>
                <button
                //   onClick={deleteGroup(groupId)}
                  onClick={() => deleteGroup(groupId)}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-black/70 text-[10px]">{Message}</p>
        {Unread > 0 && (
          <p className="text-red-500 text-[10px]">{Unread} unread messages</p>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
