
import React,{useEffect} from 'react'
import "./categoryDetail.css";
import { Publish } from "@material-ui/icons";
import {useDispatch,useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import {getCategoryById} from '../../Action/CategoryAction'
const CategoryDetail=(props)=>{
    const category=useSelector(state=>state.category.category);
    const dispatch=useDispatch();
    const location = useLocation();
    console.log(props.match);
     const id=location.pathname.slice(16,location.pathname.length);
    useEffect(()=>{
     dispatch(getCategoryById(id))
     
    },[])
 return (
  <div className="product">
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Category Name</label>
                  <input type="text" placeholder="name" value={category.name} />
                  <label>Status:</label>
                  <select name="active" value={category.status} id="active" style={{height:"30px"}}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
          </form>
             <div className="productFormRight">
                  <div className="productUpload">
                      <img src={category.categoryImage} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
      </div>
    </div>
 )
}

export default CategoryDetail;
