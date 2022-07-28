import './analytic.css'
import { PieChart, Pie, Cell } from "recharts";
import {useDispatch,useSelector} from 'react-redux';
import { useState ,useEffect} from "react";
import { getProducts } from '../../Action';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" ,"#FF0000","#800000","#800080"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Analytics() {
 const dispatch = useDispatch();

 const products=useSelector(state=>state.product.products.products);
 const dataProducts=[];
 const dataProducts1=[];

 
for(var i=0;i<products.length;i++){
 const dataproduct={};
 dataproduct["name"]=products[i].name;
 dataproduct["value"]=products[i].quantity;
 dataproduct["color"]=COLORS[i];

dataProducts.push(dataproduct);
}
for(var j=0;j<products.length;j++){
 const dataproduct1={};
 dataproduct1["name"]=products[j].name;
 dataproduct1["value"]=products[j].daBan;
 dataproduct1["color"]=COLORS[j];

 dataProducts1.push(dataproduct1);
}
   useEffect(()=>{
     dispatch(getProducts());
   },[])
  return (
  <div className='analytics'>
   <div className='products'>
    <h1>Phân tích products</h1>
    <div>
    <PieChart width={600} height={600} className='analytics'>
   <Pie
        dataKey="value"
        isAnimationActive={false}
        data={dataProducts}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        label={renderCustomizedLabel}
         
      >
        {dataProducts.map((product, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </div>
 
    <div className='content'>
      {
        
        dataProducts.map((product,index)=>(
          <div className='name' >
          <div className='name01' style={{backgroundColor:product.color,height:"30px",width:"60px",marginRight:"10px"}}>
          </div>
          <span>{product.name}</span>
       </div>
        ))

        }     
    </div>
   </div>
     <div className='products'>
    <h1>Phân tích sản phẩm đã bán</h1>
    <div>
    <PieChart width={600} height={600} className='analytics'>
   <Pie
        dataKey="value"
        data={dataProducts1}
        isAnimationActive={false}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"     
      >
        {dataProducts1.map((product, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </div>
 
    <div className='content'>
      {
        
        dataProducts1.map((product,index)=>(
          <div className='name' >
          <div className='name01' style={{backgroundColor:product.color,height:"30px",width:"60px",marginRight:"10px"}}>
          </div>
          <span>{product.name}</span>
       </div>
        ))

        }     
    </div>
   </div>
   </div>

  );
}

