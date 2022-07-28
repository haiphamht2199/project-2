import React from 'react'
import './order.css';
import { DataGrid } from "@material-ui/data-grid";

import { Link } from "react-router-dom";
import { useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getAllOrder } from '../../Action/orderAction';
function Orders() {
  const dispatch=useDispatch();
  useEffect(()=>{
  dispatch(getAllOrder());
  },[]);
  const orders=useSelector(state=>state.order.orders);
  console.log("users",orders);
  const columns = [
    { field: "id",
     headerName: "Tên Khách Hàng",
      width: 190 ,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.user.firstName+" "+params.row.user.lastName}
          </div>
        );
      },
    
    },
    {
      field: "user",
      headerName: "Địa chỉ giao hàng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.adress}
          </div>
        );
      },
    },
    { field: "email",
     headerName: "Số điện thoại",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.phoneNumber}
          </div>
        );
      },
      
     },
    {
      field: "status",
      headerName: "Tổng Tiền($)",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.totalAmount}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/order/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}

export default Orders;
