import React, { useRef, useState } from "react";
import "./chat.css";
import LogoSearch from "../LogoSearch/LogoSearch";
import axios from "axios";
import Conversation from "../conversations/Conversation";
import ChatBox from "../chatbox/ChatBox";
import { useEffect } from "react";
import { io } from "socket.io-client";



const Chat = () => {
  const socket = useRef();
 

const [chats, setChats] = useState([]);
const [onlineUsers, setOnlineUsers] = useState([]);
const [currentChat, setCurrentChat] = useState(null);
const [sendMessage, setSendMessage] = useState(null); 
const [receivedMessage, setReceivedMessage] = useState(null);
const user = JSON.parse(localStorage.getItem("user"));
 



useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  socket.current = io("ws://localhost:8800");
  socket.current.emit("new-user-add",user._id)
  socket.current.on('get-users',(users)=>{
    setOnlineUsers(users);
    
    
  })
  

},[user._id])



useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        
        const getChats = async()=>{
            
        try{
        const  res = await axios.get("/conv/"+user._id)
        console.log(res.data)
         setChats(res.data);
        
        }catch(err){
            console.log(err);
        }
           
        };
        getChats();
    },[user._id]);
  

  

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data,"received msg from socket")
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    // <div className="chatBody">
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
      {/* <LogoSearch /> */}
      

        
        <div className="Chat-container">
          <h3>Chats</h3>
          <div className="Chat-list">
            {chats.map((chat) => (
              
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                  
                />
              </div>
            ))}
          </div>
        </div>
      </div> 

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
           
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
    // </div>
  );
};

export default Chat;











































// import React, { useContext, useEffect } from 'react';
// import Conversation from '../conversations/Conversation';
// import Message from '../message/Message';
// import ChatOnline from '../chatOnline/ChatOnline';
// import "./chat.css"
// import {UserContext} from '../../App';
// import { useState } from 'react';
// import axios from "axios"
// import { useRef } from 'react';
// import {io} from "socket.io-client"

// export default function Chat() {

// const[conversations,setConversations] = useState([]);
// const[currentChat,setCurrentChat] = useState(null);
// const[messages,setMessages] = useState(null); 
// const[newMessage,setNewMessage] = useState(""); 
// const[arrivalMessage,setArrivalMessage] = useState(null); 
// const socket = useRef(io("ws://localhost:8900"))
// const scrollRef = useRef();

//  //const{user,setUser} = useContext(UserContext);
// const {state,dispatch} = useContext(UserContext)
// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user);
 

// // useEffect(()=>{
// //     setSocket(io("ws://localhost:8900"))
// // },[])

// useEffect(()=>{
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage",data =>{
//         setArrivalMessage({
//             sender:data.senderId,
//             text:data.text,
//             createdAt:Date.now(),
//         })

// })
// },[]);
// // useEffect(()=>{
// //     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
// //     setMessages(()[...messages,arrivalMessage])

// // },[arrivalMessage]);

// // useEffect(()=>{
// //     socket.current.emit("addUser",user._id);
// //     socket.current.on("getUsers",(users)=>{
// //         console.log(users);
// //     })
// // })
    
    
  

// useEffect(()=>{
//     const user = JSON.parse(localStorage.getItem("user"));
//     // console.log(user);
//     const getConversations = async()=>{
        
//     try{
//     const  res = await axios.get("/conv/"+user._id)
//      setConversations(res.data);
    
//     }catch(err){
//         console.log(err);
//     }
       
//     };
//     getConversations();
// },[user._id]);
// // console.log(currentChat,"currentchat")
// useEffect(()=>{
//     const getMessages =  async ()=>{
//         try{
            
//             const res = await axios.get("/getmsg/"+currentChat?._id)
//             setMessages(res.data)
            
//         }catch(err){
//             console.log(err)
            
//         }
       

//     };
//     getMessages();
// },[currentChat])
// // console.log(messages,"from message")

// const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const message ={
//         sender:user._id,
//         text:newMessage,
//         conversationId:currentChat._id,


//     };

//     const receiverId = currentChat.members.find(member => member !==user._id)
//     socket.current.emit("sendMessage",{
//         senderId:user._id,
//         receiverId,
//         text:newMessage,
//     })
//     try{
//         const res = await axios.post("/addmsg",message)
//         setMessages([...messages,res.data])
//         setNewMessage("")

//     }catch(err){
//         console.log(err)
//     }
// };

 
// // useEffect(()=>{
// //     scrollTo()
// // });

// // function scrollTo(ref) {

// //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }
  

//   return (
// <>
//         <div className="chat">
//                <div className="chatMenu">
//                      <div className="chatMenuwrapper">
//                             <input placeholder="Search for friends"className="chatMenuInput"/>
//                             {conversations.map((c)=>(
//                                 <div onClick={() => setCurrentChat(c )}>
//                                     <Conversation conversation={c} currentUser={user}/>

                                    
//                                 </div>

//                             ))}
                           
//                      </div>
//                     </div>
//                 <div className="chatBox">
//                     <div className="chatBoxWrapper">
//                         {
//                             currentChat?
//                         <>
//                         <div className="chatBoxTop">
//                               <div ref ={scrollRef}>
//                             {messages.map(m =>  (
//                                     <Message message={m} own={m.sender === user._id} />
//                                     ))}
//                                 </div>

//                         </div>
//                         <div className="chatBoxBottom">
//                             <textarea className='chatMessageInput' placeholder='write something....' 
//                             onChange={(e)=> setNewMessage(e.target.value)}
//                             value = {newMessage}></textarea>
//                             <button className="chatSend" onClick={handleSubmit}>Send</button>

//                         </div></>:<span className='noConversationText'>open a Conversation</span>}
//                     </div>
//                     </div>  
//                 <div className="chatOnline">
//                     <div className="chatOnlineWrapper">
//                         <h6>Online</h6>
//                         <ChatOnline/>
                       
//                     </div>
//                   </div>
//         </div>

// </>
//   );
// }
