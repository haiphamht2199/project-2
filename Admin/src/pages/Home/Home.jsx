import React ,{useEffect,useMemo,useState}from 'react'
import Chart from '../../components/chart/Chart'
import FitureInfo from '../../components/FitureInfo/FitureInfo'
import './Home.css';
import {userData} from '../../Data'
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import {useDispatch,useSelector} from 'react-redux'
import { getAllOrder, getAllUsers, getProducts } from '../../Action';
import axiosIntance from '../../helper/axios';
const Home=(props)=>{
  const dispatch=useDispatch();
  const products=useSelector(state=>state.product.products.products);
    const [userStats, setUserStats] = useState([]);
    const orders=useSelector(state=>state.order.orders);
    const total=orders.reduce((a, c) => a + c.totalAmount, 0);
    const totalProducts=orders.reduce((a, c) => a + c.items.reduce((b,d)=>b+d.quantity,0), 0);
    // const _total=products.reduce((a, c) => a + c.quantity, 0);

    const users=useSelector(state=>state.user.users);
    

useEffect(()=>{
  dispatch(getProducts());
},[])
useEffect(()=>{
    dispatch(getAllOrder());
    dispatch(getAllUsers());
},[])
const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axiosIntance.get("/admin/getStats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
 return (
  <div className="home">
   <FitureInfo total={total} totalProducts={totalProducts} totalUser={users}/>
   <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
   <div className="homeWidgets">
        <WidgetSm/>
       <WidgetLg/>
      </div>
  </div>
 )
}

export default Home
