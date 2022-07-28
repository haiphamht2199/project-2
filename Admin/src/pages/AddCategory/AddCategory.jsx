import React, { useState } from 'react'
import "./addCategory.css";
import axios from "../../helper/axios";
import { useDispatch } from 'react-redux';
import { AddCate, getAllCategory } from '../../Action/CategoryAction';
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
const  AddCategory=()=> {
    const dispatch=useDispatch();
    const history = useHistory()
     const [name,setName]=useState('');
     const [status,setStatus]=useState('yes');
     const [image,setImage]=useState('');
      const [fileInputState, setFileInputState] = useState('');
    const [loading,setLoading]=useState(false)
const handleSubmit=()=>{
   
    const category={
      name,
      status,
      image
    }
    dispatch(AddCate(category));
    dispatch(getAllCategory());

    history.push("/");
    toast.success('Thêm category thành công!');
  
    
    }
 const handleFileInputChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFileInputState(e.target.value);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =async () => {
            try {
            const res=await axios.post('/upload',{data:reader.result},{headers: { 'Content-Type': 'application/json' }});
            setImage(res.data.secure_url);
            setLoading(true);
            // setFileInputState('');
            // setPreviewSource('');
        } catch (err) {
            console.error(err);
        }
        };
        reader.onerror = () => {
            console.error('Error');
        };
    };
 return (
  <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
       <div>
            <h1>Upload</h1>
            < div className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
            </div>
             {loading&&(
              <div>
                <img
                    src={image}
                    alt="chosen"
                    style={{ height: '200px',width:"200px" }}
                />
                 </div>
            )}
        </div>
      <form  className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="status" id="active" onChange={(e)=>setStatus(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Create</button>
      </form>
 
    </div>
 )
}

export default AddCategory
