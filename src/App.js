import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Chat from './components/chat/Chat'
import Conversation from './components/conversations/Conversation';
import AdminSignIn from './components/admin/signin/AdminSignIn';
import AdHome from './components/admin/pages/home/AdHome';
import Sidebar from './components/admin/sidebar/Sidebar';
import UserList from './components/admin/pages/userList/UserList'
import PostList from './components/admin/pages/postslist/PostList';
import PostReports from './components/admin/pages/reports/PostReports';
import LikedPost from './components/screens/LikedPost'







export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
   
    
    <Switch>
     
      

      <Route path="/admin" >
      <AdminSignIn/>
      </Route>
      <Route path="/adminhome" >
      <AdHome/>
      </Route>
      <Route path="/users" >
      <UserList/>
      </Route>
      <Route path="/postlist" >
      <PostList/>
      </Route>
      <Route path="/reportedposts" >
      <PostReports/>
      </Route>
      <Route path="/likedpost" >
      <LikedPost/>
      </Route>
      
      
      
        
        
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
      
    </Switch>
    
  
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  const isadmin = localStorage.getItem('admin')
  return (
    <UserContext.Provider
     value={{state,dispatch}}>
    <BrowserRouter>
      {!isadmin && <NavBar /> }
      
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App; 
