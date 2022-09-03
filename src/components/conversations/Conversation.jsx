import React, { useContext, useEffect } from 'react';
import "./conversation.css";
import {UserContext} from '../../App';
import { useState } from 'react';
import axios from "axios"
import { on } from 'nodemailer/lib/xoauth2';

export default function Conversation({data,currentUserId,online}) {
  const [user, setUser] = useState("")
  
  const [userpic, setUserPic] = useState("")
  

  useEffect(() => {
    const friendId = data.members.find((id) => id !== currentUserId);
  
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
            setUser(data.user.name )
            setUserPic(data.user.pic)
            // console.log(data.user.pic,"pics user")
           
            // console.log(data.user,"from response")
           
           } catch (err) {
            console.log(err);
            }
          };
          getUser();
  }, [currentUserId,data]);

  return (
      
      <>
    <div className="conversation">
      <div></div>
      {online &&<div className='online-dot'></div>}

      <img
        className="followerImg"
        src={userpic}
        alt=""
        style={{width:'50px',height:'50px'}}
      />
      <div className="conversationName" style={{fontSize:"1.2rem"}} >
        <span >{user}</span>
       </div>
       <div className='online'>

       <span>
        {online? "online":"offline"}
        </span> 
        
       
      </div>
      
      
    </div>
    <hr style={{width:'85%',border:"0.1px solid #ececec"}}/>
    </>
    
  );
}











// fetch('/user/'+ friendId,{
    //   method:"get",
    //   headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":"Bearer"+localStorage.getItem("jwt")
    //     }
    //   })
      