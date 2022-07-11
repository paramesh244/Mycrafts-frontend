import React, { useContext, useEffect } from 'react';
import Conversation from '../conversations/Conversation';
import Message from '../message/Message';
import ChatOnline from '../chatOnline/ChatOnline';
import "./chat.css"
import {UserContext} from '../../App';
import { useState } from 'react';
import axios from "axios"
import { useRef } from 'react';
import {io} from "socket.io-client"

export default function Chat() {

const[conversations,setConversations] = useState([]);
const[currentChat,setCurrentChat] = useState(null);
const[messages,setMessages] = useState(null); 
const[newMessage,setNewMessage] = useState(""); 
const[arrivalMessage,setArrivalMessage] = useState(null); 
const socket = useRef(io("ws://localhost:8900"))
const scrollRef = useRef();

 //const{user,setUser} = useContext(UserContext);
const {state,dispatch} = useContext(UserContext)
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
 

// useEffect(()=>{
//     setSocket(io("ws://localhost:8900"))
// },[])

useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",data =>{
        setArrivalMessage({
            sender:data.senderId,
            text:data.text,
            createdAt:Date.now(),
        })

})
},[]);
// useEffect(()=>{
//     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
//     setMessages(()[...messages,arrivalMessage])

// },[arrivalMessage]);

// useEffect(()=>{
//     socket.current.emit("addUser",user._id);
//     socket.current.on("getUsers",(users)=>{
//         console.log(users);
//     })
// })
    
    
  

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    const getConversations = async()=>{
        
    try{
    const  res = await axios.get("/conv/"+user._id)
     setConversations(res.data);
    
    }catch(err){
        console.log(err);
    }
       
    };
    getConversations();
},[user._id]);
// console.log(currentChat,"currentchat")
useEffect(()=>{
    const getMessages =  async ()=>{
        try{
            
            const res = await axios.get("/getmsg/"+currentChat?._id)
            setMessages(res.data)
            
        }catch(err){
            console.log(err)
            
        }
       

    };
    getMessages();
},[currentChat])
// console.log(messages,"from message")

const handleSubmit = async(e)=>{
    e.preventDefault();
    const message ={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id,


    };

    const receiverId = currentChat.members.find(member => member !==user._id)
    socket.current.emit("sendMessage",{
        senderId:user._id,
        receiverId,
        text:newMessage,
    })
    try{
        const res = await axios.post("/addmsg",message)
        setMessages([...messages,res.data])
        setNewMessage("")

    }catch(err){
        console.log(err)
    }
};

 
// useEffect(()=>{
//       scrollRef.current?.scrollIntoView({behavior :"smooth"});
// });

function scrollTo(ref) {
    if (ref.current) return;
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
<>
        <div className="chat">
               <div className="chatMenu">
                     <div className="chatMenuwrapper">
                            <input placeholder="Search for friends"className="chatMenuInput"/>
                            {conversations.map((c)=>(
                                <div onClick={() => setCurrentChat(c )}>
                                    <Conversation conversation={c} currentUser={user}/>
                                   

                                    
                                    
                                </div>

                            ))}
                           
                     </div>
                    </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat?
                        <>
                        <div className="chatBoxTop">
                              {/* <div ref ={scrollRef}> */}
                            {messages.map(m =>  (
                                    <Message message={m} own={m.sender === user._id} />
                                    ))}
                                 {/* //</div> */}

                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='write something....' 
                            onChange={(e)=> setNewMessage(e.target.value)}
                            value = {newMessage}></textarea>
                            <button className="chatSend" onClick={handleSubmit}>Send</button>

                        </div></>:<span className='noConversationText'>open a Conversation</span>}
                    </div>
                    </div>  
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <h6>Online</h6>
                        <ChatOnline/>
                       
                    </div>
                  </div>
        </div>

</>
  );
}
