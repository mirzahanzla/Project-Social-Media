

// // // import { useState } from 'react';
// // // import axios from 'axios';
// // // import { AnimatePresence, motion } from 'framer-motion';
// // // import InfluencerProfile from './InfluencerProfile';

// // // const Search = () => {
// // //   const [IsFilterOpen, setIsFilterOpen] = useState(0);
// // //   const [ShowInfluencerProfile, setShowInfluencerProfile] = useState(0);
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [errorMessage, setErrorMessage] = useState('');

// // //   const handleSearch = async () => {
// // //     if (searchQuery.trim() === '') return;
// // //     try {
// // //       const response = await axios.get(`/api/users/search`, {
// // //         params: { query: searchQuery }
// // //       });
// // //       setSearchResults(response.data);
// // //       setErrorMessage('');
// // //     } catch (error) {
// // //       // Log the error for debugging purposes
// // //       console.error('Error fetching search results:', error);
  
// // //       if (error.response && error.response.status === 404) {
// // //         setErrorMessage('No users found');
// // //       } else {
// // //         setErrorMessage('An error occurred while searching. Please try again.');
// // //       }
  
// // //       // Ensure search results are cleared when an error occurs
// // //       setSearchResults([]);
// // //     }
// // //   };
  
  

// // //   return (
// // //     <>
// // //       {/* Side bar Filter .That will open when IsFilterOpen is clicked */}
// // //       {ShowInfluencerProfile ? (
// // //         <InfluencerProfile setShowInfluencerProfile={setShowInfluencerProfile} />
// // //       ) : (
// // //         <>
// // //           <AnimatePresence>
// // //             {IsFilterOpen && (
// // //               <div className="bg-neutral-300/65 z-20 h-full w-full absolute top-0 right-0">
// // //                 <motion.div
// // //                   initial={{ x: 700 }}
// // //                   animate={{ x: 0 }}
// // //                   exit={{ x: 700 }}
// // //                   transition={{ duration: 0.4 }}
// // //                   className="bg-white h-full w-[300px] sm:w-[600px] absolute top-0 right-0"
// // //                 >
// // //                   <div className="mx-8 my-5">
// // //                     <div
// // //                       className="hover:cursor-pointer"
// // //                       onClick={() => setIsFilterOpen(false)}
// // //                     >
// // //                       <img src="Svg/Close.svg" alt="" />
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               </div>
// // //             )}
// // //           </AnimatePresence>

// // //           {/* Container or margin from side */}
// // //           <div className="pt-10">
// // //             <p className="lato-bold md:text-xl text-center">
// // //               Search from the World {' '}
// // //               <span style={{ color: '#FB773F' }} className="defaultTextColor">
// // //                 Largest Database{' '}
// // //               </span>
// // //               of Influencers
// // //             </p>

// // //             {/* Options Influencer size age */}
// // //             <div className="flex justify-center mt-10">
// // //               <div className="flex">
// // //                  <div className="   md:w-[100px] md:h-[35px] absolute rounded-2xl xs:flex justify-center items-center hidden xs:block">
// // //                   <p className="rouge-script-regular p-1  text-2xl z-20">Instagram
// // //                   </p>
// // //                 </div>
// // //                 {/* Search bar */}
// // //                 <div
// // //                   className="w-[250px] flex justify-center relative xs:w-[350px] sm:w-[400px] pl-2 xs:pl-[90px] rounded-xl md:h-[35px] md:w-[500px] md:pl-[110px] outline-0 text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm bg-white overflow-hidden"
// // //                 >
// // //                   <div className="absolute top-3 right-5 cursor-pointer h-full" onClick={handleSearch}>
// // //                     <img src="Svg/SearchIcon.svg" alt="Search Icon" />
// // //                   </div>
// // //                   <input
// // //                     type="text"
// // //                     className="w-full outline-0"
// // //                     placeholder="Search anything here ..."
// // //                     value={searchQuery}
// // //                     onChange={(e) => setSearchQuery(e.target.value)}
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Influencer Profile will be shown below in the form of a list */}
// // //             {searchResults.length > 0 ? (
// // //               searchResults.map((influencer, index) => (
// // //                 <ProfileInformation
// // //                   key={index}
// // //                   ProfileImage={'Media/p1.jpg'} // Assuming placeholder image
// // //                   name={influencer.name}
// // //                   UserName={influencer.username}
// // //                   Followers={influencer.followers}
// // //                   Bio={influencer.bio}
// // //                   setShowInfluencerProfile={setShowInfluencerProfile}
// // //                 />
// // //               ))
// // //             ) : (
// // //               <div className="text-center mt-10 text-red-500">
// // //                 <p>{errorMessage}</p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // const ProfileInformation = ({
// // //   ProfileImage,
// // //   name,
// // //   UserName,
// // //   Followers,
// // //   Bio,
// // // }) => {
// // //   return (
// // //     <div className="mb-10">
// // //       <div className="bg-white OverViewBox2 xs:grid grid-cols-12 w-[300px] xs:w-[500px] sm:w-[640px] md:w-[740px] lg:w-[800px] p-2 border-2 mx-auto mt-5 rounded-xl">
// // //         <div className="flex flex-col col-span-3 items-center mt-3">
// // //           <div className="flex size-[60px] xs:size-[80px] sm:size-[100px] md:size-[100px] items-center">
// // //             <img className="aspect-square Avatar" src={`${ProfileImage}`} alt="Influencer" />
// // //           </div>
// // //           <p className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm mt-4">
// // //             {name}
// // //           </p>
// // //           <p className="lato-regular text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm text-black/50">
// // //             {UserName}
// // //           </p>
// // //         </div>

// // //         <div className="col-span-8 sm:col-span-6 ml-5 xs:ml-10 sm:ml-0 flex flex-col xs:border-l-2 sm:border-l-0 lg:border-l-2">
// // //           <div className="sm:mt-10 mr-4">
// // //             <div className="flex items-center justify-around sm:mr-1 md:mr-2">
// // //               <div className="lato-regular">
// // //                 <div>
// // //                   <span className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm">
// // //                     {Followers}
// // //                   </span>
// // //                   <span className="ml-1 md:text-sm sm:text-[13px] text-[9px] xs:text-[10px]">
// // //                     Followers
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <div className="lato-regular">
// // //                 <p className="poppins-regular text-[9px] sm:text-[13px] md:text-sm xs:text-[10px]">
// // //                   {Bio}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Search;







// // import { useState } from 'react';
// // // import axios from 'axios';
// // import { AnimatePresence, motion } from 'framer-motion';
// // import InfluencerProfile from './InfluencerProfile';

// // const Search = () => {
// //   const [IsFilterOpen, setIsFilterOpen] = useState(0);
// //   const [ShowInfluencerProfile, setShowInfluencerProfile] = useState(0);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   // Dummy data for testing
// //   const dummyInfluencers = [
// //     { _id: '1', name: 'John Doe', username: 'johndoe', followers: '1M', bio: 'Lifestyle influencer' },
// //     { _id: '2', name: 'Jane Smith', username: 'janesmith', followers: '500K', bio: 'Fitness coach' },
// //     { _id: '3', name: 'Rizwan Khan', username: 'rizwan', followers: '750K', bio: 'Travel blogger' },
// //     { _id: '4', name: 'Ali Ahmed', username: 'ali', followers: '250K', bio: 'Food critic' },
// //     { _id: '5', name: 'Sara Ali', username: 'sara', followers: '2M', bio: 'Fashion expert' },
// //   ];

// //   const handleSearch = async () => {
// //     if (searchQuery.trim() === '') return;

// //     // Simulating a delay to mimic an API call
// //     setTimeout(() => {
// //       const results = dummyInfluencers.filter(influencer =>
// //         influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         influencer.username.toLowerCase().includes(searchQuery.toLowerCase())
// //       );

// //       if (results.length > 0) {
// //         setSearchResults(results);
// //         setErrorMessage('');
// //       } else {
// //         setSearchResults([]);
// //         setErrorMessage('No users found');
// //       }
// //     }, 500);
// //   };

// //   return (
// //     <>
// //       {/* Side bar Filter .That will open when IsFilterOpen is clicked */}
// //       {ShowInfluencerProfile ? (
// //         <InfluencerProfile setShowInfluencerProfile={setShowInfluencerProfile} />
// //       ) : (
// //         <>
// //           <AnimatePresence>
// //             {IsFilterOpen && (
// //               <div className="bg-neutral-300/65 z-20 h-full w-full absolute top-0 right-0">
// //                 <motion.div
// //                   initial={{ x: 700 }}
// //                   animate={{ x: 0 }}
// //                   exit={{ x: 700 }}
// //                   transition={{ duration: 0.4 }}
// //                   className="bg-white h-full w-[300px] sm:w-[600px] absolute top-0 right-0"
// //                 >
// //                   <div className="mx-8 my-5">
// //                     <div
// //                       className="hover:cursor-pointer"
// //                       onClick={() => setIsFilterOpen(false)}
// //                     >
// //                       <img src="Svg/Close.svg" alt="" />
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             )}
// //           </AnimatePresence>

// //           {/* Container or margin from side */}
// //           <div className="pt-10">
// //             <p className="lato-bold md:text-xl text-center">
// //               Search from the World {' '}
// //               <span style={{ color: '#FB773F' }} className="defaultTextColor">
// //                 Largest Database{' '}
// //               </span>
// //               of Influencers
// //             </p>

// //             {/* Options Influencer size age */}
// //             <div className="flex justify-center mt-10">
// //               <div className="flex">
// //                 <div className="md:w-[100px] md:h-[35px] absolute rounded-2xl xs:flex justify-center items-center hidden xs:block">
// //                   <p className="rouge-script-regular p-1 text-2xl z-20">Instagram</p>
// //                 </div>
// //                 {/* Search bar */}
// //                 <div className="w-[250px] flex justify-center relative xs:w-[350px] sm:w-[400px] pl-2 xs:pl-[90px] rounded-xl md:h-[35px] md:w-[500px] md:pl-[110px] outline-0 text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm bg-white overflow-hidden">
// //                   <div className="absolute top-3 right-5 cursor-pointer h-full" onClick={handleSearch}>
// //                     <img src="Svg/SearchIcon.svg" alt="Search Icon" />
// //                   </div>
// //                   <input
// //                     type="text"
// //                     className="w-full outline-0"
// //                     placeholder="Search anything here ..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Influencer Profile will be shown below in the form of a list */}
// //             {searchResults.length > 0 ? (
// //               searchResults.map((influencer) => (
// //                 <ProfileInformation
// //                   key={influencer._id}
// //                   ProfileImage={'Media/p1.jpg'} // Assuming placeholder image
// //                   name={influencer.name}
// //                   UserName={influencer.username}
// //                   Followers={influencer.followers}
// //                   Bio={influencer.bio}
// //                   setShowInfluencerProfile={setShowInfluencerProfile}
// //                 />
// //               ))
// //             ) : (
// //               <div className="text-center mt-10 text-red-500">
// //                 <p>{errorMessage}</p>
// //               </div>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // const ProfileInformation = ({
// //   ProfileImage,
// //   name,
// //   UserName,
// //   Followers,
// //   Bio,
// // }) => {
// //   return (
// //     <div className="mb-10">
// //       <div className="bg-white OverViewBox2 xs:grid grid-cols-12 w-[300px] xs:w-[500px] sm:w-[640px] md:w-[740px] lg:w-[800px] p-2 border-2 mx-auto mt-5 rounded-xl">
// //         <div className="flex flex-col col-span-3 items-center mt-3">
// //           <div className="flex size-[60px] xs:size-[80px] sm:size-[100px] md:size-[100px] items-center">
// //             <img className="aspect-square Avatar" src={ProfileImage} alt="Influencer" />
// //           </div>
// //           <p className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm mt-4">
// //             {name}
// //           </p>
// //           <p className="lato-regular text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm text-black/50">
// //             {UserName}
// //           </p>
// //         </div>

// //         <div className="col-span-8 sm:col-span-6 ml-5 xs:ml-10 sm:ml-0 flex flex-col xs:border-l-2 sm:border-l-0 lg:border-l-2">
// //           <div className="sm:mt-10 mr-4">
// //             <div className="flex items-center justify-around sm:mr-1 md:mr-2">
// //               <div className="lato-regular">
// //                 <div>
// //                   <span className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm">
// //                     {Followers}
// //                   </span>
// //                   <span className="ml-1 md:text-sm sm:text-[13px] text-[9px] xs:text-[10px]">
// //                     Followers
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className="lato-regular">
// //                 <p className="poppins-regular text-[9px] sm:text-[13px] md:text-sm xs:text-[10px]">
// //                   {Bio}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Search;






// // import { useState } from 'react';
// // import axios from 'axios'; // Make sure Axios is installed
// // import { AnimatePresence, motion } from 'framer-motion';
// // import InfluencerProfile from './InfluencerProfile';

// // const Search = () => {
// //   const [IsFilterOpen, setIsFilterOpen] = useState(0);
// //   const [ShowInfluencerProfile, setShowInfluencerProfile] = useState(0);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState('');


// //   const handleSearch = async () => {
// //     if (searchQuery.trim() === '') return;
    
// //     try {
// //       const response = await axios.get(`/api/users/search`, {
// //         params: { query: searchQuery }
// //       });
// //       setSearchResults(response.data);
// //       setErrorMessage('');
// //     } catch (error) {
// //       console.error('Error fetching search results:', error);
      
// //       if (error.response && error.response.status === 404) {
// //         setErrorMessage('No users found');
// //       } else {
// //         setErrorMessage('An error occurred while searching. Please try again.');
// //       }

// //       setSearchResults([]);
// //     }
// //   };

// //   return (
// //     <>
// //       {ShowInfluencerProfile ? (
// //         <InfluencerProfile setShowInfluencerProfile={setShowInfluencerProfile} />
// //       ) : (
// //         <>
// //           <AnimatePresence>
// //             {IsFilterOpen && (
// //               <div className="bg-neutral-300/65 z-20 h-full w-full absolute top-0 right-0">
// //                 <motion.div
// //                   initial={{ x: 700 }}
// //                   animate={{ x: 0 }}
// //                   exit={{ x: 700 }}
// //                   transition={{ duration: 0.4 }}
// //                   className="bg-white h-full w-[300px] sm:w-[600px] absolute top-0 right-0"
// //                 >
// //                   <div className="mx-8 my-5">
// //                     <div className="hover:cursor-pointer" onClick={() => setIsFilterOpen(false)}>
// //                       <img src="Svg/Close.svg" alt="Close" />
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             )}
// //           </AnimatePresence>

// //           <div className="pt-10">
// //             <p className="lato-bold md:text-xl text-center">
// //               Search from the World{' '}
// //               <span style={{ color: '#FB773F' }} className="defaultTextColor">
// //                 Largest Database{' '}
// //               </span>
// //               of Influencers
// //             </p>

// //             {/* Search Bar */}
// //             <div className="flex justify-center mt-10">
// //               <div className="flex">
// //                 <div className="md:w-[100px] md:h-[35px] absolute rounded-2xl xs:flex justify-center items-center hidden xs:block">
// //                   <p className="rouge-script-regular p-1 text-2xl z-20">Instagram</p>
// //                 </div>

// //                 <div className="w-[250px] flex justify-center relative xs:w-[350px] sm:w-[400px] pl-2 xs:pl-[90px] rounded-xl md:h-[35px] md:w-[500px] md:pl-[110px] outline-0 text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm bg-white overflow-hidden">
// //                   <input
// //                     type="text"
// //                     className="w-full outline-0"
// //                     placeholder="Search anything here ..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                   />
// //                   <div className="absolute top-3 right-5 cursor-pointer h-full" onClick={handleSearch}>
// //                     <img src="Svg/SearchIcon.svg" alt="Search" />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Display Error Message */}
// //             {errorMessage && (
// //               <p className="text-center text-red-500 mt-4">{errorMessage}</p>
// //             )}

// //             {/* Search Results */}
// //             <div className="mt-5">
// //               {searchResults.length > 0 ? (
// //                 searchResults.map((result, index) => (
// //                   <ProfileInformation
// //                     key={index}
// //                     ProfileImage={result.ProfileImage}
// //                     name={result.name}
// //                     UserName={result.UserName}
// //                     Followers={result.Followers}
// //                     ER={result.ER}
// //                     Instagram={result.Instagram}
// //                     Likes={result.Likes}
// //                     Comments={result.Comments}
// //                     Bio={result.Bio}
// //                     pic1={result.pic1}
// //                     pic2={result.pic2}
// //                     pic3={result.pic3}
// //                     pic4={result.pic4}
// //                     setShowInfluencerProfile={setShowInfluencerProfile}
// //                   />
// //                 ))
// //               ) : (
// //                 <p className="text-center">No results found. Try searching with different keywords.</p>
// //               )}
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // const ProfileInformation = ({
// //   ProfileImage, name, UserName, Followers, ER, Instagram, Likes, Comments, Bio, pic1, pic2, pic3, pic4}) => {
// //   return (
// //     <div className="mb-10">
// //       <div className="bg-white OverViewBox2 xs:grid grid-cols-12 w-[300px] xs:w-[500px] sm:w-[640px] md:w-[740px] lg:w-[800px] p-2 border-2 mx-auto mt-5 rounded-xl">
// //         {/* Left side of profile */}
// //         <div className="flex flex-col col-span-3 items-center mt-3">
// //           <img className="aspect-square Avatar" src={ProfileImage} alt="Profile" />
// //           <p className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm mt-4">{name}</p>
// //           <p className="lato-regular text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm text-black/50">{UserName}</p>
// //         </div>

// //         {/* Middle of profile */}
// //         <div className="col-span-8 sm:col-span-6 ml-5 xs:ml-10 sm:ml-0 flex flex-col xs:border-l-2 sm:border-l-0 lg:border-l-2">
// //           <div className="sm:mt-10 mr-4">
// //             <div className="flex items-center justify-around sm:mr-1 md:mr-2">
// //               <div className="lato-regular">
// //                 <div>
// //                   <span className="poppins-bold text-[9px] xs:text-[10px] sm:text-[13px] md:text-sm">{Followers}</span>
// //                   <span className="ml-1 md:text-sm sm:text-[13px] text-[9px] xs:text-[10px]">Followers</span>
// //                 </div>
// //                 <div className="flex items-center sm:mt-1 md:mt-2">
// //                   <img className="h-[12px] xs:h-[15px] sm:h-[20px] mr-2" src="Svg/Instagram.svg" alt="Instagram" />
// //                   <p className="lato-light text-[9px] xs:text-[10px] sm:text-base">{Instagram}</p>
// //                 </div>
// //               </div>
// //               <div className="lato-regular">
// //                 <div>
// //                   <span className="poppins-bold text-[9px] sm:text-[13px] md:text-sm xs:text-[10px]">{ER}</span>
// //                   <span className="ml-1 md:text-sm sm:text-[13px] xs:text-[10px] text-[9px]">Engagement Rate</span>
// //                 </div>
// //                 <div className="flex justify-center gap-x-3 mt-2">
// //                   <div className="flex items-center gap-x-1">
// //                     <img src="Svg/Heart.svg" className="Avatar size-[12px] xs:size-[15px] sm:h-[16px]" alt="Likes" />
// //                     <p className="text-[9px] lato-light xs:text-[10px] sm:text-sm">{Likes}</p>
// //                   </div>
// //                   <div className="flex items-center gap-x-1">
// //                     <img src="Svg/Comment.svg" className="Avatar size-[12px] xs:size-[15px] sm:h-[16px]" alt="Comments" />
// //                     <p className="text-[9px] lato-light xs:text-[10px] sm:text-sm">{Comments}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="poppins-regular text-[9px] sm:text-[13px] md:text-sm mt-5 xs:text-[10px] text-center ml-2">
// //               <p>{Bio}</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Pictures Section */}
// //         <div className="col-span-3 hidden lg:block mt-5">
// //           <div className="grid grid-cols-2 gap-1 h-[120px]">
// //             <img src={pic1} className="h-full" alt="Pic1" />
// //             <img src={pic2} className="h-full" alt="Pic2" />
// //             <img src={pic3} className="h-full" alt="Pic3" />
// //             <img src={pic4} className="h-full" alt="Pic4" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Search;





























// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const Message = () => {
//   const [ShowMessage, setShowMessage] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedMember, setSelectedMember] = useState("");
//   const [chats, setChats] = useState({});
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedUserImage, setSelectedUserImage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [recentChats, setRecentChats] = useState([]);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // Connect to the socket server
//   useEffect(() => {
//     socketRef.current = io("http://localhost:3000");
//     const userId = "YOUR_USER_ID"; // Replace with actual user ID
//     socketRef.current.emit("join", userId);

//     socketRef.current.on("receiveMessage", (data) => {
//       console.log("New message from:", data.senderId, "Message:", data.text);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const LoadingSpinner = () => (
//     <div className="flex justify-center mt-5">
//       <div
//         style={{
//           border: "4px solid #f3f3f3",
//           borderRadius: "50%",
//           borderTop: "4px solid #3498db",
//           width: "30px",
//           height: "30px",
//           animation: "spin 2s linear infinite",
//         }}
//       ></div>
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );

//   // Search for users by fullName and username
//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;
//     setIsSearching(true);
//     setSearchResults([]);
//     setIsLoading(true); // Show loading spinner
//     setErrorMessage("");

//     try {
//       const response = await axios.get(`/api/users/search`, {
//         params: { query: searchQuery },
//         cancelToken: new axios.CancelToken((c) => (window.cancelRequest = c)),
//       });

//       setTimeout(() => {
//         if (response.data.length === 0) {
//           setErrorMessage("User not found");
//         } else {
//           setSearchResults(response.data);
//         }
//         setIsLoading(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error searching for users:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Fetch messages when a member is selected
//   useEffect(() => {
//     if (selectedMember) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(
//             `/api/messages/chat?member=${selectedMember}`
//           );
//           if (Array.isArray(response.data)) {
//             setMessages(response.data);
//             setChats((prevChats) => ({
//               ...prevChats,
//               [selectedMember]: response.data,
//             }));
//           } else {
//             console.error("Unexpected response format:", response.data);
//             setMessages([]);
//           }
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//           setMessages([]);
//         }
//       };
//       fetchMessages();
//     }
//   }, [selectedMember]);

//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       const token = localStorage.getItem('authToken'); // Get token from local storage
//       if (!token) {
//         console.error('No token found'); // Log if no token is present
//         return;
//       }

//       try {
//         const response = await axios.get('/auth/getLoggedInUser', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set Authorization header
//           },
//         });

//         if (response.status === 200) {
//           setLoggedInUserId(response.data._id); // Assuming response.data contains the user object and _id holds the user ID
//         } else {
//           console.error('Failed to fetch user:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching logged-in user:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchLoggedInUser(); // Fetch user data on component mount
//   }, []);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) {
//       console.error("Cannot send an empty message.");
//       return;
//     }

//     if (!loggedInUserId) {
//       console.error("User is not logged in.");
//       return;
//     }

//     if (!selectedMember) {
//       console.error("No member selected to send the message to.");
//       return;
//     }

//     const messageToSend = {
//       text: newMessage,
//       sender: loggedInUserId || "Guest", // Ensure loggedInUserId is set
//       receiver: selectedMember, // Ensure selectedMember is set
//     };

//     try {
//       const response = await axios.post("http://localhost:3000/api/messages/chatmessage", messageToSend);
//       if (response.status === 201) {
//         setMessages((prevMessages) => [...prevMessages, response.data]);

//         // Update recent chats
//         setRecentChats((prevChats) => {
//           const existingChatIndex = prevChats.findIndex(
//             (chat) => chat.receiver === selectedMember || chat.sender === selectedMember
//           );
//           if (existingChatIndex >= 0) {
//             const updatedChats = [...prevChats];
//             const [chat] = updatedChats.splice(existingChatIndex, 1);
//             return [chat, ...updatedChats];
//           }
//           return [response.data, ...prevChats];
//         });

//         // Emit the message to the server for broadcasting
//         socketRef.current.emit("sendMessage", messageToSend);

//         setNewMessage(""); // Clear the input field after sending
//       } else {
//         console.error("Failed to send message:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Handle selecting a user to chat with
//   const handleSelectMember = (user) => {
//     setSelectedMember(user.fullName);
//     setShowMessage(true);
//     setMessages(chats[user.fullName] || []);
//     setSelectedUserImage(user.photo); // Ensure this contains the correct path
//     console.log("Selected User Image:", user.photo); // Log the image path
//   };

//   // Fetch recent chats
//   useEffect(() => {
//     const fetchRecentChats = async () => {
//       if (!loggedInUserId) return;

//       try {
//         const response = await axios.get(`/api/messages/recent?userId=${loggedInUserId}`);
//         if (Array.isArray(response.data)) {
//           setRecentChats(response.data);
//         } else {
//           console.error("Unexpected response format for recent chats:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching recent chats:", error);
//       }
//     };

//     fetchRecentChats();
//   }, [loggedInUserId]);

//   // Scroll to the bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="bg-white h-screen text-[9px] xs:text-[10px] sm:text-[13px] md:text-[14px]">
//       <div className="sm:grid sm:grid-cols-12 mdm:w-[800px] lg:w-[1000px] mx-auto">
//         {/* Left Side - Search Users */}
//         <div className="col-span-4 border-r-[1px] pr-2 h-screen ml-2">
//           <div className="flex justify-center mt-5 sm:mt-5 sm:justify-between items-center">
//             <div>
//               <div className="flex items-center w-[250px] sm:w-[180px] mdm:w-[200px] lg:w-[250px] relative">
//                 <img
//                   className="size-[20px] absolute top-3 left-2 cursor-pointer"
//                   src="/Svg/SearchIcon.svg"
//                   alt="Search"
//                   onClick={handleSearch}
//                 />
//                 <input
//                   className="outline-0 bg-none w-full h-[40px] bg-black/5 rounded-lg pl-9"
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search"
//                 />
//               </div>
//               {/* Display Error Message */}
//               {errorMessage && (
//                 <p className="text-center text-red-500">{errorMessage}</p>
//               )}
//               {isLoading && <LoadingSpinner />}
//             </div>
//             <div className="hidden sm:flex text-blue-600 cursor-pointer text-[15px] mr-5">
//               <p className="poppins-medium">New Chat</p>
//             </div>
//           </div>

//           <div className="ml-10 mr-2 mt-5">
//             <p className="poppins-semibold text-[15px]">Member</p>
//             <h1>Welcome, User ID: {loggedInUserId}</h1>
//             {searchResults.length > 0 ? (
//               searchResults.map((user) => (
//                 <InfluncerMessage
//                   key={user._id}
//                   Image={user.photo}
//                   Name={user.fullName}
//                   Time="Online" // Or show last activity time
//                   Message={user.lastMessage || "No messages yet"} // Display last message
//                   onClick={() => handleSelectMember(user)}
//                 />
//               ))
//             ) : (
//               !isLoading && searchQuery.trim() && (
//                 <p className="text-center">No users found</p>
//               )
//             )}
//           </div>

//           {/* Recent Chats Section */}
//           <div className="ml-10 mr-2 mt-5">
//             <p className="poppins-semibold text-[15px]">Recent Chats</p>
//             {recentChats.length > 0 ? (
//               recentChats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className="flex items-center border-b py-2"
//                   onClick={() => handleSelectMember(chat)}
//                 >
//                   <img className="size-[40px] Avatar" src={chat.photo} alt={chat.fullName} />
//                   <div className="flex flex-col ml-3">
//                     <p className="font-semibold">{chat.fullName}</p>
//                     <p className="text-gray-500">{chat.lastMessage || "No messages yet"}</p>
//                     <p className="text-xs text-gray-400">{chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleString() : ''}</p> {/* Display time */}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No recent chats available.</p>
//             )}
//           </div>
//         </div>

//         {/* Right Side - Chat Area */}
//         <div className="col-span-8 px-2">
//           {ShowMessage ? (
//             <div className="flex flex-col h-full">
//               <div className="flex justify-between items-center bg-gray-100 p-2">
//                 <div className="flex items-center">
//                   <img className="size-[40px] Avatar" src={selectedUserImage} alt={selectedMember} />
//                   <h2 className="poppins-semibold text-[14px] ml-2">{selectedMember}</h2>
//                 </div>
//               </div>

//               <div className="flex-1 overflow-y-auto p-2">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`message ${msg.sender === loggedInUserId ? "sent" : "received"} flex items-start`}
//                   >
//                     <div className={`${msg.sender === loggedInUserId ? "ml-auto" : "mr-auto"} max-w-[70%]`}>
//                       <p className={`p-2 rounded-lg ${msg.sender === loggedInUserId ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
//                         {msg.text}
//                       </p>
//                       <p className="text-xs text-gray-400 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="flex p-2">
//                 <input
//                   className="outline-0 bg-black/5 w-full h-[40px] rounded-lg pl-2"
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                 />
//                 <button className="ml-2 bg-blue-500 text-white rounded-lg px-4" onClick={handleSendMessage}>
//                   Send
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex justify-center items-center h-full">
//               <p>Select a user to start chatting!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;
