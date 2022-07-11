import "./rightbar.css"
import React from "react";




export default function Rightbar({profile}) {
  const pf=process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRight = () => {
    return(
      <>
      <div className="quotecontainer">
          
          <span className="quotetext">Place where the world share their creatings</span>
        </div> 
        <img className="rightbarad" src="./assets/a.webp" alt=""  />
        <h4 className="rightbartitle">Active</h4>
        <ul className="rightbarfriendlist">
          param
          
          

          
        </ul>
      
      </>
    );
  };

  const ProfileRight = () =>{
    return(
      <>
      <h4 className="rightbartitle">User information</h4>
      <div className="rightbarinfo">
        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">City:</span>
          <span className="rightbarinfovalue">Mysore</span>
        </div>

        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">From:</span>
          <span className="rightbarinfovalue">Mandya</span>
        </div>

        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">Relationship:</span>
          <span className="rightbarinfovalue">single</span>
        </div>
        
      </div>

      <h4 className="rightbartitle">Friends</h4>
      <div className="followings">
        <div className="following">
          <img src={`${pf}person/1.jpg`} alt="" className="followinngimg" />

          <span className="followingname">Prashanth</span>
        </div>

        <div className="following">
          <img src={`${pf}person/2.jpg`} alt="" className="followinngimg" />

          <span className="followingname">Niha</span>
        </div>

        <div className="following">
          <img src={`${pf}person/3.jpg`} alt="" className="followinngimg" />

          <span className="followingname">Swamy</span>
        </div>

        <div className="following">
          <img src={`${pf}person/4.jpg`} alt="" className="followinngimg" />

          <span className="followingname">Prashanth W</span>
        </div>

        <div className="following">
          <img src={`${pf}person/5.jpg`} alt="" className="followinngimg" />

          <span className="followingname">Deepak</span>
        </div>

        <div className="following">
          <img src={`${pf}person/6.jpg`} alt="" className="followinngimg" />

          <span className="followingname">vinith</span>
        </div>
      </div>
      </>

    );
  };
  
  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
      {profile ? <ProfileRight /> : <HomeRight/>}
       </div>
    </div>



  );
}
