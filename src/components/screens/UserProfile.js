import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams,useHistory} from 'react-router-dom'
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"; 
import { Close } from '@material-ui/icons';
import "./uf.css"
const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const currentUser = JSON.parse( localStorage.getItem("user"))
    const [selectedImage,setSelectedImage] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const history = useHistory()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])


    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
        
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    const chat=()=>{
        fetch('/newconv',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                senderId: currentUser._id,
                receiverId:userid
            })
           
            
               
        }).then(res=>res.json())
        
      
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
          const newData = userProfile.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setProfile(newData)
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
          const newData = userProfile.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setProfile(newData)
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
            const newData = userProfile.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
           })
          setProfile(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

    
   return (
       <>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userProfile.user.pic}
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                   </div>
                   {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  onClick={()=>{chat();history.push('/Chat')}}>message</button>
                   
                  

               </div>
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
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
        
          

            <motion.img src={selectedImage.photo} alt= "enlrged pic"
            initial={{y:"-10vh"}}
            animate={{y:0}}
            />
            </div>
            

        
          
          
            <div className="card-content">
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




           
           </div>
       </div>
       
       
       : <h6>loading...!</h6>}
       
       
       </>
       
   )
}


export default Profile