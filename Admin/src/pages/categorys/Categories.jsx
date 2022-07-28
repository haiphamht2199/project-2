import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import './category.css'
import { getAllCategory,DeleteCategory } from "../../Action/CategoryAction";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
const Categories=(props)=> {
   const [open, setOpen]=useState(false);
   const [iddelete,setiddelete]=useState("");
 const handleClickOpen = (id) => {
    setOpen(true);
    setiddelete(id);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  const categories=useSelector(state=>state.category.categories);
 
  useEffect(()=>{
    dispatch(getAllCategory());
  },[])

  const handleDelete = () => {
    const _id=iddelete;


    dispatch(DeleteCategory(_id));
    setOpen(false);
    toast.success('Bạn đã xóa category thành công!');
  };

  const columns = [
    { field: "id", headerName: "ID", width: 250,
    renderCell: (params) => {
      return (
        <div>
          {params.row._id}
        </div>
      );
    },
  },
    {
      field: "product",
      headerName: "category",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="categoryListImg" src={params.row.categoryImage} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/category/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleClickOpen(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
   <>
    <div className="productList" style={{ height: 600, maxWidth:"100%",marginRight:"250px",
    justifyItems:"center",alignItems:"center",justifyContent:"center"  }}>
    <div className="productTitleContainer" style={{marginBottom:"20px"}}>
        <Link to="/admin/newcategory">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={categories}
        disableSelectionOnClick
        columns={columns}
        pageSize={4}
        getRowId={(row) => row._id}
        checkboxSelection
        
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Bạn có chắc chắn muốn xóa không!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
export default Categories;