import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import './style.css'
import M from 'materialize-css'
import {Report,LocationOn,Close} from "@material-ui/icons";
import {motion} from "framer-motion/dist/framer-motion"; 
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [selectedAddress,setSelectedAddress] = useState(null)
    const history = useHistory()
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
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
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
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
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
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
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
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

       //report post

       const reportPost = (id)=>{
        fetch('/report',{
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
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
          M.toast({html:"post reported",classes:"#c62828 red darken-3"})
        }).catch(err=>{
            console.log(err)
        })
  }
//remove report
  const removeReport = (id)=>{
    fetch('/removereport',{
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
      const newData = data.map(item=>{
          if(item._id===result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
      M.toast({html:"post removed from reported",classes:"#43a047 green darken-1"})
    }).catch(err=>{
      console.log(err)
  })
}
   return (
    <div className="Home">
    {
        data.map(item=>{
            return(
              
               <div>
                
                <div className="card home-card" key={item._id}>
                  <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id === state._id 
                     && <i className="material-icons" style={{
                         float:"right"
                     }} 
                     onClick={()=>deletePost(item._id)}
                     >delete</i>
                    
                     

                     }
                   
                     </h5>

                     <h6>
                              <i className="material-icons" onClick={()=>setSelectedAddress(item)}><LocationOn/></i>{item.postedBy.city}
                              
                              </h6>
                              {selectedAddress &&
                            //   <div class="card55">
                                <motion.div className='card55' style={{width:"300px"}}
                                initial={{opacity:0}}
                                 animate={{opacity:0.6}}
                                >
                                <Close  style={{
                                   float:"right",
                                   cursor:"pointer"
                               }}  onClick={()=>setSelectedAddress('')}/>
                             <h4>{selectedAddress.postedBy.name}</h4>
                             <h6>{selectedAddress.postedBy.city}</h6>
                              
                              <p>{selectedAddress.postedBy.address}</p>
                              {/* <p><button>Add to Cart</button></p> */}
                            </motion.div> }



                     <div className="card-image">
                         <img src={item.photo}/>
                     </div>
                     <div className="card-content">
                     <p class="price">₹{item.price}</p>
                     {item.likes.includes(state._id)
                     ? 
                      <i className="material-icons" style={{color:"red"}}
                      onClick={()=>{unlikePost(item._id)}}
                       >favorite</i>
                     : 
                     <i className="material-icons"
                     onClick={()=>{likePost(item._id)}}
                     >favorite_border</i>
                     
                     }
                     {item.reports.includes(state._id)
                     ? 
                     <i className="material-icons"  style={{ float:"right"}}>
                      <Report onClick={()=>{removeReport(item._id)}} style={{ float:"right",cursor:"pointer"}}/>
                      </i>
                     : 
                     <i className="material-icons"  style={{ float:"right"}}>
                      <Report onClick={()=>{reportPost(item._id)}} />
                      </i>
                     
                     }
                    {/* <i >
                       <Report onClick={()=>{reportPost(item._id)}} style={{ float:"right"}}/>
                      </i> */}
                     {/* <i className="material-icons" style={{ float:"right"}}>bookmarks</i> */}
                    
                         <h6>{item.likes.length} likes</h6>
                         <h6>{item.title}</h6>
                         <p>{item.body}</p>
                         



                         <div className='comment'>
                                   {
                                    item.comments.map(record=>{
                                        console.log(record,"comments record")
                                           return(
                                            (record.postedBy) &&( <h6  key={record._id}><span   style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>)
                                            // <div className='comment'>
                                           
                                           )
                                        })
                                        
                                    }
                                    </div>
                         {/* <div className='comment'>
                         {
                          item.comments.map(record=>{
                                 return(
                                  // <div className='comment'>
                                  <h6  key={record._id}><span   style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                 )
                              })
                              
                          }
                          </div> */}
                         
                         <form onSubmit={(e)=>{
                             e.preventDefault()
                             makeComment(e.target[0].value,item._id)
                          }} >
                           <input type="text" placeholder="add a comment"  />  
                         </form>
                         
                     </div>
                 </div> 
                 
                </div> 
            )
        })
    }
   

</div>

)
}

export default Home