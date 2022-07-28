import "./product.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch,useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import {getProducts,DeleteProduct} from '../../Action/productAction';

const ProductList=(props)=> {
 const dispatch = useDispatch();

const products=useSelector(state=>state.product.products.products);
  useEffect(()=>{
    dispatch(getProducts());
  },[])
const handleDelete = (id) => {
    dispatch(DeleteProduct(id));
  };

const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageProduct} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
       { field: "category", headerName: "Category", width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.category.name}
        </div>
      );
    },},
    { field: "Quantity", headerName: "Quantity", width: 130 ,
    renderCell: (params) => {
      return (
        <div>
          {params.row.quantity}
        </div>
      );
    },
  },
    { field: "stock", headerName: "Stock", width: 130 ,
    renderCell: (params) => {
      return (
        <div>
          {params.row.stock}
        </div>
      );
    },
  },
    {
      field: "color",
      headerName: "Color",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.color}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price($)",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.price}
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
            <Link to={"/admin/product/" + params.row._id} data={params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer" style={{marginBottom:"20px"}}>
        <Link to="/admin/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products?products:null}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
        
      />
    </div>
  );
}
export default ProductList