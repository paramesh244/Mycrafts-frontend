import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../App'
import axios from "axios";

export default function WidgetSm() {
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const {users,setUsers} = useState([])
  const [profile,setProfile] = useState(null)
  

  useEffect(()=>{
    fetch('/users/',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result,"users data")
        setData(result.user)
        
    })
 },[])
console.log(profile,"userProfile")

// const deleteUserHandler = async (user_id) => {
//   console.log(user_id)
//   try {
//     var prevState = { ...data }
//     let output = data.filter((x) => x._id !== user_id)
//     console.log(output)
//     setData(output)

//      await axios.delete(`/delete/${user_id}`)
  
//   } catch (error) {
    
//     setData(prevState)
//     console.log('user delete error', error)
//   }
// }
const deleteUserHandler = async (user_id) => {
  console.log(user_id)
  try {
    var prevState = { ...data }
    let output = data.filter((x) => x._id !== user_id)
    console.log(output)
    setData(output)

     await axios.delete(`/delete/${user_id}`)
  
  } catch (error) {
    
    setData(prevState)
    console.log('user delete error', error)
  }
}

  return (
<div className="dash-cards-holder">
  
<div className="dash-number-users">
      {data.map((x,idx)=>(
        <div key={idx} className="widgetSm">
      <span className="widgetSmTitle"></span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src={x.pic}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{x.name}</span>
            
          </div>
          <button className="widgetSmButton" onClick={()=>setProfile(x)}>
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
       </ul>
    </div>
      ))}
    </div>
    

    {profile && <div className="profile-model" style={{width:"500px"}} >
    {/* <div class="card"  > */}
  <img src={profile.pic} alt="John" style={{width:"100%"}} />
  <h1>{profile.name}</h1>
  <p class="title">{}</p>
  <p>{profile.email}</p>
  <h6><b>Followers:{profile.followers.length} Following:{profile.following.length}</b></h6>
  
  <p><h6>{profile.city}</h6>
  {profile.address}</p>

  <p><button onClick={(id)=>{deleteUserHandler(profile._id);window.location="/adminhome"}}>Remove</button></p>

      
  </div> }
    
</div>
   
  );
}
