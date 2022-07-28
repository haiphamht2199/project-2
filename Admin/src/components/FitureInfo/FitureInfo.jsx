import React from 'react'
import './FitureInfo.css';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
function FitureInfo(props) {
  console.log(props)
 return (
  <div className="featured">
  <div className="featuredItem" style={{backgroundColor:"yellow"}}>
    <span className="featuredTitle">Tổng sản phẩm đã bán:</span>
    <div className="featuredMoneyContainer">
      <span className="featuredMoney" >{props.totalProducts}</span>
      <span className="featuredMoneyRate">
        -11.4 <ArrowDownward   className="featuredIcon negative"/>
      </span>
    </div>
    <span className="featuredSub">Compared to last week</span>
  </div>
  
  <div className="featuredItem" style={{backgroundColor:"green"}}>
    <span className="featuredTitle" >Doanh thu</span>
    <div className="featuredMoneyContainer">
      <span className="featuredMoney">{props.total} $</span>
      <span className="featuredMoneyRate">
        -1.4 <ArrowDownward className="featuredIcon negative"/>
      </span>
    </div>
    <span className="featuredSub">Compared to last week</span>
  </div>
  <div className="featuredItem"  style={{backgroundColor:"red"}}>
    <span className="featuredTitle" >Tổng số người dùng</span>
    <div className="featuredMoneyContainer">
      <span className="featuredMoney">{props.totalUser.length}</span>
      <span className="featuredMoneyRate">
        +2.4 <ArrowUpward className="featuredIcon"/>
      </span>
    </div>
    <span className="featuredSub">Compared to last week</span>
  </div>
</div>
 )
}

export default FitureInfo
