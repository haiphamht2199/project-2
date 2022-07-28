import React from 'react';
import "./TopBar.css";
import {NotificationsNone,Language,Settings} from '@material-ui/icons'
function TopBar(){
 return (
  <div className="topbar">
   <div className="topbarWraper">
   <div className="topleft">
   <div className="logo">HPAdmin</div>
   </div>
   <div className="topright">
    <div className="topBarIconsContent">
     <NotificationsNone/>
     <div className="topIconBage">2</div>
    </div>
    <div className="topBarIconsContent">
     <Language/>
     <div className="topIconBage">2</div>
    </div>
    <div className="topBarIconsContent">
     <Settings/>
    </div>
    <div>
     <img src="https://tse1.mm.bing.net/th?id=OIP.D06Is3B3biOfo1E2nHHZawHaK1&pid=Api&P=0&w=300&h=300" alt="" className="topAvatar" />
    </div>
   </div>
   </div>

  </div>
 )
}
export default TopBar;