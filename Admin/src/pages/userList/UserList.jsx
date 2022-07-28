import React from 'react'
import './userList.css';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../Data";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getAllUsers } from '../../Action/userAction';
function UserList() {
  const dispatch=useDispatch();
  useEffect(()=>{
  dispatch(getAllUsers());
  },[]);
  const users=useSelector(state=>state.user.users);
  console.log("users",users);
 const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id",
     headerName: "ID",
      width: 200 ,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row._id}
          </div>
        );
      },
    
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.firstName+" "+params.row.lastName}
          </div>
        );
      },
    },
    { field: "email",
     headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
    
            {params.row.email}
          </div>
        );
      },
      
     },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser" style={params.row.status?{backgroundColor:"green", width:"60px",height:"40px",borderRadius:"5px", paddingLeft:"10px"}:{backgroundColor:"red", width:"60px",height:"40px",borderRadius:"5px"}}>
    
            {params.row.status?"Active":"NoActive"}
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
            <Link to={"/admin/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}

export default UserList
