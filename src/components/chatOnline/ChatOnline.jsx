import React from "react";
import "./chatonline.css";
import { useState, useEffect,axios} from "react";
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  // const [friends, setFriends] = useState([]);
  // const [onlineFriends, setOnlineFriends] = useState([]);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   const getFriends = async () => {
  //     const res = await axios.get("/users/follow/" + currentId);
  //     setFriends(res.data);
  //   };

  //   getFriends();
  // }, [currentId]);

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  // const handleClick = async (user) => {
  //   try {
  //     const res = await axios.get(
  //       `/conv/find/${currentId}/${user._id}`
  //     );
  //     setCurrentChat(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (<>
   
    <div className="chatOnline">
      
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
              alt=""
              />
                <div className="chatOnlineBadge">
                </div>
                    
                
          </div>
          
          <span className="chatOnlineName">akash</span>
        </div>
    
    </div>
              </>
  );
}