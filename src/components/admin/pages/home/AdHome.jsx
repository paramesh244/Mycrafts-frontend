import React from "react";
import Chart from "../../chart/Chart"
import FeaturedInfo from "../../featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../../dummyData";
import WidgetSm from "../../widgetSm/WidgetSm";
import WidgetLg from "../../widgetLg/WidgetLg";
import Sidebar from "../../sidebar/Sidebar"
import { useState,useEffect } from "react";
import { UserContext } from "../../../../App";
import { useContext } from "react";

// const Home  = ()=>{
//   const [data,setData] = useState([])
//   const {state,dispatch} = useContext(UserContext)
//   useEffect(()=>{
//      fetch('/users/',{
         
//      }).then(res=>res.json())
//      .then(result=>{
//          console.log(result)
//          setData(result.)
//      })
//   },[])
// }





export default function AdHome() {

  const [myUsers,setUsers] = useState([]);
  const [post,setPosts] = useState([]);
  // const {state,dispatch} = useContext(UserContext)

  useEffect(  ()=>{
    caller();
 },[])

async function caller (){
  

  fetch('/users/',{
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
}).then(res=>res.json())
.then(result=>{
    console.log(result.user,"my res")
     setUsers(result.user)
     console.log('set users',setUsers)
   
})
console.log(setUsers,"set user")
}


useEffect(  ()=>{
  
 postCaller();

},[])

async function postCaller(){
  fetch('/allpost/',{
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
}).then(res=>res.json())
.then(result=>{
    console.log(result.posts,"my res posts")
     setPosts(result.posts)
     console.log(result.posts.reports,"all posts ")
    
   
})

}




  return (
    <>
    
    <div className="top11">
      <h5>Mycrafts </h5>
      <div className="log">

    <button type="button" class="btn btn-danger" onClick={()=>{    localStorage.removeItem('admin');  localStorage.removeItem('user');localStorage.removeItem('jwt');window.location="/admin"}}>Logout</button>
      </div>

    </div>
   
   {/* <button onClick={()=>{    localStorage.removeItem('admin');  localStorage.removeItem('user');localStorage.removeItem('jwt');window.location="/admin"}}>Logout</button>  */}
     <div className="sidebar">
      <Sidebar/>
      
     </div>
    
    
     <div className="home">
      
        
      <div className="container1">
        
        
            <h5>Total users : {myUsers.length}</h5>
            <h5>Total posts : {post.length}</h5>
        
      

      </div>
      {/* <div className="cont">
      {post.map(p=>{
          return(
            
       

         <h5>total reports:{p.reports.length}</h5>   
          )
          
            
          
        })}
      </div> */}
      

      <div className="homeWidgets">
       
       <WidgetSm/>
       
     </div>

     
      </div>
    </>
    
    
  );
}
