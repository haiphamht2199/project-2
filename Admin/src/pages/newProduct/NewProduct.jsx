import React,{useState,useEffect} from 'react'
import "./newProduct.css";
import ReactQuill from "react-quill";
import {useDispatch,useSelector} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import axios from '../../helper/axios'
import { getAllCategory } from '../../Action/CategoryAction';
import { AddProduct, getProducts } from '../../Action/productAction';
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
const NewProduct=(props) =>{
  const dispatch=useDispatch();
  const history = useHistory();
  const categories=useSelector(state=>state.category.categories);
  const [fileInputState, setFileInputState] = useState('');
  const [loading,setLoading]=useState(false);
  const [image,setImage]=useState('');

  const [name,setName]=useState('');
  const [category,setCategory]=useState('');
  const [quantity,setQuantity]=useState('');
  const [price,setPrice]=useState('');
  const [color,setColor]=useState('Đỏ');
  const [ram,setRam]=useState('2 GB');
  const [memory,setMemory]=useState('32 GB');
  const [cpu,setCpu]=useState('Android');
  const [camera,setCamera]=useState('');
  const [decription,setDecription]=useState('');


  //
  const modules = {
		toolbar: [
	      [{ 'font': [] }],
	      [{ 'size': ['small', false, 'large', 'huge'] }],
	      ['bold', 'italic', 'underline'],
	      [{'list': 'ordered'}, {'list': 'bullet'}],
	      [{ 'align': [] }],
	      [{ 'color': [] }, { 'background': [] }],
	      ['clean']
	    ]
	};
  const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
  ];
useEffect(()=>{
dispatch(getAllCategory());
},[])
const onChangeText=(html)=>{
  setDecription(html)
}
const handleSubmit=(e)=>{
  e.preventDefault();
  const product={
    image,
    name,
    category,
    quantity,
    price,
    color,
    ram,
    memory,
    cpu,
    camera,
    decription
  }
  dispatch(AddProduct(product));
  dispatch(getProducts());
  history.push("/");
  toast.success('Thêm sản phẩm  thành công!');
}
const handleImage=(e)=>{
 e.preventDefault();
 const file=e.target.files[0];
 setFileInputState(e.target.value);
 const reader=new FileReader();
 reader.readAsDataURL(file);
 reader.onload=async()=>{
 try {
   const res=await axios.post('/upload',{data:reader.result},{headers:{'Content-Type':'application/json'}});
   console.log(res);
   setImage(res.data.secure_url);
   setLoading(true);
 } catch (error) {
   console.log(error)
 }
 }
 reader.onerror=()=>{
   console.log('error');
 }
}
 return (
  <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        <div className="addProductItem">
          <label>Hình ảnh</label>
          <input type="file"
           id="file"
           name="image"
           value={fileInputState} 
           onChange={handleImage}
           />
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
        <div className="listProductIteam">
        <div className="addProductItem">
          <label>Tên</label>
          <input type="text"
           placeholder="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
             />
        </div>
        <div className="addProductItem">
          <label>Loại sản phẩm</label>
          <select 
          name="color"
           id="active"
           value={category}
             onChange={(e)=>setCategory(e.target.value)}
           >
            {
              categories.map(cate=>(
                <option key={cate._id} value={cate._id}>{cate.name}</option>
              ))
            }
          </select>
        </div>
        <div className="addProductItem">
          <label>Giá</label>
          <input type="text"
           placeholder="price" 
           name="price" 
           value={price}
             onChange={(e)=>setPrice(e.target.value)}
           />
        </div>
        </div>
        <div className="listProductIteam">
        <div className="addProductItem">
          <label>Số lượng</label>
          <input
           type="text"
            placeholder="quantity"
             name="quantity"
             value={quantity}
             onChange={(e)=>setQuantity(e.target.value)}
              />
        </div>
        <div className="addProductItem">
          <label>Màu sắc</label>
          <select 
          name="color"
           id="active"
           value={color}
             onChange={(e)=>setColor(e.target.value)}
           >
            <option value="Đỏ">Đỏ</option>
            <option value="Xanh">Xanh</option>
            <option value="Đen">Đen</option>
            <option value="Trắng">Trắng</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>RAM</label>
          <select
           name="ram"
            id="active"
            value={ram}
             onChange={(e)=>setRam(e.target.value)}
            >
             <option value="2 GB">2 GB</option>
             <option value="3 GB">3 GB</option>
             <option value="4 GB">4 GB</option>
             <option value="6 GB">6 GB</option>
             <option value="8 GB">8 GB</option>
             <option value="12 GB">12 GB</option>
          </select>
        </div>
        </div>
        <div className="listProductIteam">
        <div className="addProductItem">
          <label>Bộ nhớ trong</label>
          <select
           name="memory"
            id="active"
            value={memory}
             onChange={(e)=>setMemory(e.target.value)}
            >
            <option value="32 GB">32 GB</option>
            <option value="64 GB">64 GB</option>
            <option value="128 GB">128 GB</option>
            <option value="256 GB">256 GB</option>
            <option value="512 GB">512 GB</option>
          </select>
        </div>
        <div className="addProductItem">
        <label>Hệ điều hành</label>
          <select 
          name="cpu"
           id="active"
           value={cpu}
          onChange={(e)=>setCpu(e.target.value)}
           >
            <option value="Android">Android</option>
            <option value="IOS">IOS</option>
          </select>
          </div>
          <div className="addProductItem">
          <label>Camera chính</label>
          <input
           type="text" 
           placeholder="MP" 
           name="camera" 
           value={camera}
             onChange={(e)=>setCamera(e.target.value)}
           />
        </div>
        </div>
        <div className="decription">
        <label>Mô tả</label>
        <ReactQuill
         name="decription"
          style={{minHeight:"400px"}}
           className="add-new-post__editor mb-1"
           theme="snow"
           value={decription}
           onChange={onChangeText}
           modules={modules}
	        formats={formats}
           
            />
        </div>
        <button  className="addProductButton" type="submit">Create</button>
      </form>
    </div>
 )
}

export default NewProduct
