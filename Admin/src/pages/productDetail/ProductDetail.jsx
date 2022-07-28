import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productdetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { getAllCategory, getProductById, getProducts } from "../../Action";
const ProductDetail = (props) => {
  const location = useLocation();
  const id = location.pathname.slice(15, location.pathname.length);
  const _productById = useSelector((state) => state.product);
  const _product = useSelector(
    (state) =>
      state.product.products.products &&
      state.product.products.products.find((product) => product._id === id)
  );
  console.log("hello", _product);

  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  const { product, loading, error } = _productById;
  const productById = product[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getAllCategory());
  }, []);

  // const [fileInputState, setFileInputState] = useState('');

  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [ram, setRam] = useState("");
  const [memory, setMemory] = useState("");
  const [cpu, setCpu] = useState("");
  const [camera, setCamera] = useState("");
  const [decription, setDecription] = useState("");
  const UpdateProduct = (id) => {
    alert("update product id= ", id);
  };
  return (
    <>
      {_product && (
        <div className="newProduct">
          <h1 className="addProductTitle">Update Product</h1>

          <div className="addProductForm">
            <div className="addProductItem">
              <label>Hình ảnh</label>
              <input type="file" id="file" name="image" />

              <div>
                <img
                  src={_product.imageProduct}
                  alt="chosen"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            </div>
            <div className="listProductIteam">
              <div className="addProductItem">
                <label>Tên</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={_product.name}
                />
              </div>
              <div className="addProductItem">
                <label>Loại sản phẩm</label>
                <select name="color" id="active" value={_product.category.name}>
                  {categories.map((cate) => (
                    <option key={cate._id} value={cate._id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="addProductItem">
                <label>Giá</label>
                <input
                  type="text"
                  placeholder="price"
                  name="price"
                  value={_product.price}
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
                  value={_product.quantity}
                />
              </div>
              <div className="addProductItem">
                <label>Màu sắc</label>
                <select name="color" id="active" value={_product.color}>
                  <option value="Đỏ">Đỏ</option>
                  <option value="Xanh">Xanh</option>
                  <option value="Đen">Đen</option>
                  <option value="Trắng">Trắng</option>
                </select>
              </div>
              <div className="addProductItem">
                <label>RAM</label>
                <select name="ram" id="active" value={_product.ram}>
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
                <select name="memory" id="active" value={_product.boNhoTrong}>
                  <option value="32 GB">32 GB</option>
                  <option value="64 GB">64 GB</option>
                  <option value="128 GB">128 GB</option>
                  <option value="256 GB">256 GB</option>
                  <option value="512 GB">512 GB</option>
                </select>
              </div>
              <div className="addProductItem">
                <label>Hệ điều hành</label>
                <select name="cpu" id="active" value={_product.heDieuHanh}>
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
                  value={_product.camera}
                />
              </div>
            </div>
            <div className="decription"></div>
            <button
              className="addProductButton"
              onClick={() => UpdateProduct(_product.name)}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
