import React from 'react';
import {LineStyle,Timeline,TrendingUp,PermIdentity,Storefront,
 AttachMoney,Category,AirportShuttle,BarChart,MailOutline,DynamicFeed,ChatBubbleOutline    } from "@material-ui/icons";
 import { Link } from "react-router-dom";
import './sliderbar.css'
const Slidebar=()=>{

 return (
  <div className="silderBar">
   <div className="siderBarWrapper">
    <div className="sideBarMenu">
     <h3 className="siBarTitle">DashBoard</h3>
     <ul className="siderBarList" >
      <Link to="/" className="link">
      <li  className="siderBarListIteam active" >
       <LineStyle className="sidebarIcon"/>
       Home
      </li>
      </Link>
      <Link to="/admin/analytics" className="link">
      <li className="siderBarListIteam">
       <Timeline className="sidebarIcon"/>
       Analytics
      </li>
      </Link>
      <Link to="/admin/sales" className="link">
      <li className="siderBarListIteam">
       <TrendingUp className="sidebarIcon"/>
       Sales
      </li>
      </Link>
      <Link to="/admin/report" className="link">
      <li className="siderBarListIteam">
       <BarChart className="sidebarIcon"/>
       Report
      </li>
      </Link>
     </ul>
    </div>
    <div className="sideBarMenu">
     <h3 className="siBarTitle">Quick Menu</h3>
     <ul className="siderBarList">
     <Link to="/admin/users" className="link">
      <li className="siderBarListIteam ">
       <PermIdentity  className="sidebarIcon"/>
       User
      </li>
      </Link>
      <Link to="/admin/categories" className="link">
      <li className="siderBarListIteam">
       <Category  className="sidebarIcon"/>
       Categorys
      </li>
      </Link>
      <Link to="/admin/products" className="link">
      <li className="siderBarListIteam">
       <Storefront  className="sidebarIcon"/>
       products
      </li>
      </Link>
      <Link to="/admin/orders" className="link">
      <li className="siderBarListIteam">
       <AirportShuttle  className="sidebarIcon"/>
       Orders
      </li>
      </Link>
      <Link to="/admin/cp" className='link'>
      <li className="siderBarListIteam">
       <AttachMoney  className="sidebarIcon"/>
       Custom price
      </li>
      </Link>
     </ul>
    </div>
    <div className="sideBarMenu">
     <h3 className="siBarTitle">Notifications</h3>
     <ul className="siderBarList">
      <li className="siderBarListIteam ">
       <MailOutline  className="sidebarIcon"/>
       Mail
      </li>
      <li className="siderBarListIteam">
       <DynamicFeed  className="sidebarIcon"/>
       Feedback
      </li>
      <li className="siderBarListIteam">
       <ChatBubbleOutline  className="sidebarIcon"/>
       Messages
      </li>
     </ul>
    </div>
    
   </div>
  </div>
 )
}

export default Slidebar;
