import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../../App'
import "./report.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from "../../sidebar/Sidebar"
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"; 
import { Close,ArrowDropDownCircle } from '@material-ui/icons';




export default function PostList() {
  const [data,setData] = useState([])
  const [posts,setPosts] = useState(null)
  // const {state,dispatch} = useContext(UserContext)


  useEffect(()=>{
     fetch('/reported/',{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         console.log(result.posts,"res postlist")
        setData(result.posts)
      })
  },[])



  const deletePostHandler = (postid)=>{ 
    fetch(`/deletepostadmin/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}


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
    <th scope="col">post image</th>
    <th scope="col">posted by</th>
    <th scope="col">Reports</th>
    
    <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { data.map((x,idx)=>(

    <tr>
      <th scope="row">{idx+1}</th>
      
      <td> <img
            src={x.photo}
            alt=""
            className="postImg"
            onClick={()=>setPosts(x)}
          />
          </td>
      <td>{x.postedBy.name}</td>
      <td>{x.reports.length}</td>
      
    
      
      <td><button type="button" class="btn btn-primary" onClick={(id)=>deletePostHandler(x._id)}>Remove</button></td>
      {/* <td><button type="button" class="btn btn-primary" >Remove</button></td> */}
      
    </tr>
  ))}  
    </tbody>
</table> 



{posts && 
           
           <motion.div className='post-model' style={{width:"500px"}}
           initial={{opacity:0}}
           animate={{opacity:1}}
           >
            <div className="card post-card">
            
            <div className="card-image">
            <Close  style={{
                                   float:"right"
                               }}  onClick={()=>setPosts('')}/>
        
            

                
           
            <motion.img src={posts.photo} alt= "enlrged pic"
            initial={{y:"-10vh"}}
            animate={{y:0}}
            />
            </div>
            

        
          
          
            <div className="card-content">
              <h6>Posted By: {posts.postedBy.name}   </h6>
              <h5>Likes: {posts.likes.length}  Reports: {posts.reports.length}</h5>
              <p>Title:{posts.title}</p> 
              <p>Description: {posts.body}</p>    
                                   
                               </div>
                               </div>
                  
            
           </motion.div>
           }

   
   </div>
     </>
  

)
     
}


