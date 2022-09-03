// import { Modal} from '@material-ui/core'
import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import "./style.css"
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"; 
import {Link} from 'react-router-dom'
import { Close,ArrowDropDownCircle } from '@material-ui/icons';



const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const [data,setData] = useState([])
    const currentUser = JSON.parse( localStorage.getItem("user"))
   
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [Followers,setFollowers] = useState(null)
    const [Following,setFollowing] = useState(null)
    const [selectedImage,setSelectedImage] = useState(null)
    const [selectedFollowers,setSelectedFollowers] = useState(null)
    const [selectedFollowing,setSelectedFollowing] = useState(null)
    const [liked,setLiked] = useState(null)
    
    
    
    useEffect(()=>{
            const a = currentUser.followers
            console.log(a,"followers")
            setFollowers(a)
    },[]
    )
    
      
    useEffect(()=>{
        const a = currentUser.following
        console.log(a,"followings")
        setFollowing(a)
},[]
)

    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])

    useEffect(()=>{
        fetch('/getlikedpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
     },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","mycrafts")
        data.append("cloud_name","mycraftscloud")
        fetch("https://api.cloudinary.com/v1_1/mycraftscloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }


    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                 //   console.log(result)
          const newData = mypics.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setPics(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          //   console.log(result)
          const newData = mypics.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setPics(newData)
        }).catch(err=>{
          console.log(err)
      })
  }

  const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = mypics.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
           })
          setPics(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const deletePost = (postid)=>{ 
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    
    .then(result=>{
        console.log(result)
        const newData = mypics.filter(item=>{
            return item._id !== result._id
        })
        setPics(newData)
    })
}


   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       
                       <h6  onClick={()=>setSelectedFollowers(Followers)} >{state?state.followers.length:"0"} followers</h6>
                       <h6 onClick={()=>setSelectedFollowing(Following)} >{state?state.following.length:"0"} following</h6>
                       

                        </div>
                        
                  

               </div>
               
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
           

            
            </div>  
            
            
            
            

           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title} onClick={()=>setSelectedImage(item)}/>  
                       )
                   })
               }


              

           {selectedImage && 
           
           <motion.div className='image-model' style={{width:"500px"}}
           initial={{opacity:0}}
           animate={{opacity:1}}
           >
            <div className="card profile-card">
            
            <div className="card-image">
            <Close  style={{
                                   float:"right"
                               }}  onClick={()=>setSelectedImage('')}/>
        
            <i className="material-icons" style={{
                                   float:"right"
                               }} 
                               onClick={()=>deletePost(selectedImage._id)}
                               >delete</i>

                
           
            <motion.img src={selectedImage.photo} alt= "enlrged pic"
            initial={{y:"-10vh"}}
            animate={{y:0}}
            />
            </div>
            <div className="card-content">
            <p class="price">₹{selectedImage.price}</p><a>edit</a>
                               {selectedImage.likes.includes(state._id)
                               ? 
                                <i className="material-icons" style={{color:"red"}}
                                onClick={()=>{unlikePost(selectedImage._id)}}
                                 >favorite</i>
                               : 
                               <i className="material-icons"
                               onClick={()=>{likePost(selectedImage._id)}}
                               >favorite_border</i>
                               
                               }
                               
                            
                              
                                   <h6>{selectedImage.likes.length} likes</h6>
                                   <h6>{selectedImage.title}</h6>
                                   <p>{selectedImage.body}</p>
                                   
                                   <div className='comment'>
                                   {
                                    selectedImage.comments.map(record=>{
                                           return(
                                            // <div className='comment'>
                                            <h6  key={record._id}><span   style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                           )
                                        })
                                        
                                    }
                                    </div>
                                   
                                   <form onSubmit={(e)=>{
                                       e.preventDefault()
                                       makeComment(e.target[0].value,selectedImage._id)
                                    }} >
                                     <input type="text" placeholder="add a comment"  />  
                                     
                                   </form>
                       
                                   
                               </div>
                               </div>
                  
            
           </motion.div>
           }

              

           
          



           
{selectedFollowers && 
           
           <div className='image-model' style={{width:"500px"}}
           
           >
           
    <div className="user-crd">
      <table class="table">
  <thead class="thead-dark">
    <tr>
    <th scope="col">id</th>
      <th scope="col">name</th>
      
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {Followers.map((x,idx)=>(

    <tr>
      <th scope="row">{idx+1}</th>
      <td>{x}</td>

      <td><button type="button" class="btn btn-primary" >Remove</button></td>
      
    </tr>
  ))} 
    </tbody>
</table> 
   
   </div>
     
            
          
          
            
           </div>
           }


{selectedFollowing && 
           
           <div className='image-model' style={{width:"500px"}}
           
           >
           
    <div className="user-crd">
      <table class="table">
  <thead class="thead-dark">
    <tr>
    <th scope="col">id</th>
      <th scope="col">name</th>
      
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {Following.map((x,idx)=>(

    <tr>
      <th scope="row">{idx+1}</th>
      <td>{x}</td>

      <td><button type="button" class="btn btn-primary" >Remove</button></td>
      
    </tr>
  ))} 
    </tbody>
</table> 
   
   </div>
     
            
          
          
            
           </div>
           }


</div>
           

       </div>
   )
}


export default Profile