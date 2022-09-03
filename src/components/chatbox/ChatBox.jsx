import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./chatbox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'  //receivedMessage
import axios from "axios";


const ChatBox = ({ chat, currentUser, setSendMessage,receivedMessage,online}) => {
const [userData, setUserData] = useState(null);
const [userPic, setUserPic] = useState(null);
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");

const messagesEndRef = useRef(null)

const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

 useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.conversationId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])


  // fetching data for header 
  useEffect(() => {
    // const userId = chat.members.find((id) => id !== currentUser);
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUser = async () => {
    
        try {
  
          
  
          const {data} = await axios.get("/user/"+userId,{
              
              headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                }
              })
              console.log(data.user)
              setUserData(data.user.name)
            setUserPic(data.user.pic)
             
             
             } catch (err) {
              console.log(err);
              }
            };
            
    if (chat !== null) getUser();
  }, [chat, currentUser]);

  //fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/getmsg/${chat._id}`);
        console.log(data,"messages data")
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


 



  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
    
      senderId : currentUser,
      text: newMessage,
      conversationId: chat._id,
  }
  //send msg to db
  try{
    const {data} = await axios.post('/addmsg',message);
    setMessages([...messages,data])
    setNewMessage("")
    

  }catch(error){
    console.log(error)
  }
  //send message to socket server
  const receiverId = chat.members.find((id) => id !== currentUser);
  setSendMessage({...message,receiverId})

}
//   const receiverId = chat.members.find((id)=>id!==currentUser);
//   // send message to socket server
//   setSendMessage({...message, receiverId})
//   // send message to database
//   try {
//     const { data } = await addMessage(message);
//     setMessages([...messages, data]);
//     setNewMessage("");
//   }
//   catch
//   {
//     console.log("error")
//   }
// }

// // Receive Message from parent component
// useEffect(()=> {
//   console.log("Message Arrived: ", receivedMessage)
//   if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
//     setMessages([...messages, receivedMessage]);
//   }

// },[receivedMessage])



//const scroll = useRef();
//   const imageRef = useRef();

//Always scroll to last Message
//  useEffect( ()=> {
 
  
  
//    scroll.current?.scrollIntoView({ behavior: "smooth" })
//  },[messages]);
 

//  const scrollToBottom = () => {
//    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//  }

//  useEffect(() => {
//   scrollToBottom()
// }, [messages]);

useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView(
      {
        behavior: 'smooth',
        
      })
  }
},
[messages])


  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower" style={{display:"flex"}} >
                
                <img
                    className="followerImg"
                    src={userPic}
                    alt=""
                    style={{width:'50px',height:'50px'}}
                />
                <div className="conversationName" style={{fontSize:"1rem"}}>
                    <span>{userData}</span><br/>
                    {/* <span style={{fontSize:"0.9rem"}}>{online? "online":"offline"}</span> */}
                    
                
                </div>

                </div>
                <hr style={{width:'95%',border:"0.1px solid #ececec"}}/>
              </div>
             
            
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                 
                  {/* <div ref={scroll} */}
                  
                   <div 
                    className={message.senderId === currentUser ? "message own" : "message"
                    }
                  >

                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                    <div ref={messagesEndRef} />
                  </div>
                 
                  
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              {/* <div >+</div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              {/* <div className="send-button button" onClick = {handleSend}>Send</div> */}
              <button type="button" class="btn btn-outline-success" onClick = {handleSend}>Send</button>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                // ref={imageRef}
              />
             
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;