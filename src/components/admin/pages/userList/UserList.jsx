import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../../App'
import "./userList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from "../../sidebar/Sidebar"


export default function UserList() {
  const [data,setData] = useState([])
  // const {state,dispatch} = useContext(UserContext)


  useEffect(()=>{
     fetch('/users/',{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         console.log(result)
         setData(result.user)
     })
  },[])

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
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">following</th>
      <th scope="col">followers</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { data.map((x,idx)=>(

    <tr>
      <th scope="row">{idx+1}</th>
      <td>{x.name}</td>
      <td>{x.email}</td>
      <td>{x.followers.length}</td>
      <td>{x.following.length}</td>
      <td><button type="button" class="btn btn-primary" onClick={(id)=>deleteUserHandler(x._id)}>Remove</button></td>
      
    </tr>
  ))} 
    </tbody>
</table> 
   
   </div>
     </>
  

)

    
    
    

     
}























// import "./userList.css";
// import React from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../../../dummyData"
// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function UserList  () {
//   const [data, setData] = useState(userRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };
  
//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "user",
//       headerName: "User",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="userListUser">
//             <img className="userListImg" src={params.row.avatar} alt="" />
//             {params.row.username}
//           </div>
//         );
//       },
//     },
//     { field: "email", headerName: "Email", width: 200 },
//     { field: "followers", headerName: "Followers", width: 200 },
//     { field: "following", headerName: "Following", width: 200 },
    
   
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/user/" + params.row.id}>
//               <button className="userListEdit">Edit</button>
//             </Link>
//             <DeleteOutline
//               className="userListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="userList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={8}
//         checkboxSelection
//       />
//     </div>
//   );
// }
