import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../../App'
import "./postlist.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from "../../sidebar/Sidebar"


export default function PostList() {
  const [data,setData] = useState([])
  // const {state,dispatch} = useContext(UserContext)


  useEffect(()=>{
     fetch('/allpost/',{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         console.log(result.posts,"res postlist")
        setData(result.posts)
      })
  },[])

//   const deleteUserHandler = async (user_id) => {
//     console.log(user_id)
//     try {
//       var prevState = { ...data }
//       let output = data.filter((x) => x._id !== user_id)
//       console.log(output)
//       setData(output)

//        await axios.delete(`/delete/${user_id}`)
    
//     } catch (error) {
      
//       setData(prevState)
//       console.log('user delete error', error)
//     }
//   }


return(<>
 <div className="top11">
      <h5>Mycrafts </h5>
      <div className="log">

    <button type="button" class="btn btn-danger" onClick={()=>{    localStorage.removeItem('admin');  localStorage.removeItem('user');localStorage.removeItem('jwt');window.location="/admin"}}>Logout</button>
      </div>

    </div>
   
<div className="sidebar">
      <Sidebar/>
      
     </div>
    <div className="user-crd">
      <table class="table">
  <thead class="thead-dark">
    <tr>
    <th scope="col">id</th>
    <th scope="col">posted by</th>
    <th scope="col">post image</th>
    <th scope="col">title</th>
      <th scope="col">body</th>
      
      <th scope="col">comments</th>
      <th scope="col">likes</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { data.map((x,idx)=>(

    <tr>
      <th scope="row">{idx+1}</th>
      <td>{x.postedBy.name}</td>
      <td> <img
            src={x.photo}
            alt=""
            className="postImg"
          />
          </td>
      <td>{x.title}</td>
      <td>{x.body}</td>
     
      <td>{x.comments.length}</td>
      <td>{x.likes.length}</td>
      
      {/* <td><button type="button" class="btn btn-primary" onClick={(id)=>deleteUserHandler(x._id)}>Remove</button></td> */}
      <td><button type="button" class="btn btn-primary" >Remove</button></td>
      
    </tr>
  ))}  
    </tbody>
</table> 
   
   </div>
     </>
  

)
     
}


