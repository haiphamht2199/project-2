import React ,{useEffect,useMemo,useState}from 'react'
import Chart from '../../components/chart/Chart';
import axiosIntance from '../../helper/axios';
import './sales.css'
const Sales=()=> {
 const [incomes, setIncome] = useState([]);
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
        const res = await axiosIntance.get("/admin/order/income");
        console.log(res.data);
        res.data.map((item) =>
          setIncome((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active income": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
 return (
  <div className="sales">
  <Chart data={incomes} title="Icome Analytics" grid dataKey="Active income"/>
  </div>
 )
}

export default Sales
