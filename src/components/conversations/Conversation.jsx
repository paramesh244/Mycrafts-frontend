import React, { useContext, useEffect } from 'react';
import "./conversation.css";
import {UserContext} from '../../App';
import { useState } from 'react';
import axios from "axios"

export default function Conversation({conversation,currentUser}) {
  const [user, setUser] = useState("")
  
  const [userpic, setUserPic] = useState("")
  

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
  
    const getUser = async () => {
    
      try {

        // const res = await axios("/user/" + friendId)

        const {data} = await axios.get("/user/"+friendId,{
            
            headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+ localStorage.getItem("jwt")
              }
            })
            let username = localStorage.getItem("user")
            username = JSON.parse(username)
           
            // setUser(username.name)
            setUser(data.user.name)
            setUserPic(data.user.pic)
            // console.log(data.user.pic,"pics user")
           
            // console.log(data.user,"from response")
           
           } catch (err) {
            console.log(err);
            }
          };
          getUser();
  }, [currentUser,conversation]);

  return (
      
    <div className="conversation">
      <img
        className="conversationImg"
        src={userpic}
        alt=""
      />
      <span className="conversationName">{user}</span>
    </div>
    
  );
}











// fetch('/user/'+ friendId,{
    //   method:"get",
    //   headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":"Bearer"+localStorage.getItem("jwt")
    //     }
    //   })
      