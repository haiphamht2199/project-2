import React, { useState, useEffect, useCallback } from "react";
import "./cp.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CustomerPrice from "../../components/CustomPrice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Action/productAction";
import { CustomPrice, getCustomPrice } from "../../Action";
function CP() {
  const dispatch = useDispatch();
  var selected = useSelector((state) => state.customPrice.selectedItem);
  const [users, setUsers] = useState([]);
  const selectedProduct = [];
  const products = useSelector((state) => state.product.products.products);
  const nameCp = useSelector((state) => state.customPrice.name);
  const customPrice = useSelector((state) => state.customPrice);
  const productType = useSelector((state) => state.customPrice.conditionType);
  const statusCp = useSelector((state) => state.customPrice.status);
  const valueCp = useSelector((state) => state.customPrice.discount);
  const id = useSelector((state) => state.customPrice.id);
  const [name, setName] = useState(nameCp);
  console.log("name:", name);
  const [status, setStatus] = useState(statusCp);
  const [type, setType] = useState(productType);
  const [value, setValue] = useState(valueCp);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleSaveRule = () => {
    let data = {};
    data.users = selected;
    data.name = name;
    data.value = value;
    data.type = type;
    data.status = status;
    data.id = id;
    dispatch(CustomPrice(data));
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [products]);
  useEffect(() => {
    dispatch(getCustomPrice());
  }, [productType, nameCp, statusCp]);

  useEffect(() => {
    setUsers(products);
  }, [products, selected]);

  const handleChange1 = (id, selected) => {
    dispatch({
      type: "SELECTION_OPTION",
      id: id,
      selected: selected,
    });
  };
  console.log("selected:", selected);
  return (
    <>
      {customPrice.id && (
        <div className="custom-price">
          <div className="addProductItem">
            <label>Rule</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Status</label>
            <select
              name="color"
              id="active"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="1">Enble</option>
              <option value="0">Disble</option>
            </select>
          </div>
          <div className="addProductItem">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Condition Product
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={type}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="All" />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Product Specific"
                />
              </RadioGroup>
              {type === "1" && selected && (
                <div
                  className="container my-4"
                  style={{ width: "500px", fontSize: "16px" }}
                >
                  <form className="form w-100">
                    {users.map((user, index) => (
                      <div className="form-check" key={index}>
                        <input
                          style={{ fontSize: "16px" }}
                          type="checkbox"
                          className="form-check-input"
                          name={user.name}
                          checked={
                            selected.indexOf(user._id) === -1 ? false : true
                          }
                          onChange={() => handleChange1(user._id, selected)}
                        />
                        <label
                          style={{ fontSize: "16px" }}
                          className="form-check-label ms-2"
                        >
                          {user.name}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              )}
            </FormControl>
          </div>
          <div className="addProductItem">
            <label>Value</label>
            <input
              type="Number"
              name="name"
              min={0}
              max={99}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            onClick={handleSaveRule}
            style={{
              width: "100px",
              height: "50px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              background: "cornflowerblue",
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

export default CP;
