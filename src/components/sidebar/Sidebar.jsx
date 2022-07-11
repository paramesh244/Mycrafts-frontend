import React from "react";
import "./sidebar.css"
// import {RssFeed, Chat,VideoLibrary,Bookmark,HelpOutline} from "@material-ui/icons"



export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarlist">

          <li className="sidebarlistitem">
           
            <span className="sidebarlistitemtext"> Feed</span>

          </li>

          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> chats</span>

          </li>

          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> videos</span>

          </li>

          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> questions</span>

          </li>

          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> saved</span>

          </li>
          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> saved</span>

          </li>
          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> saved</span>

          </li>
          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> saved</span>

          </li>
          <li className="sidebarlistitem">
            
            <span className="sidebarlistitemtext"> saved</span>

          </li>
        </ul>
        <button className="sidebarbutton">Show More</button>
<hr className="sidebarhr" />
<ul className="sidebarfriendlist">
  

 
</ul>

        
      </div>
      </div>
  )
}
