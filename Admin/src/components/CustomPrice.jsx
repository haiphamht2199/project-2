import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Action/productAction";

function CP() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const products = useSelector((state) => state.product.products.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    setUsers(products);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
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
              checked={user?.isChecked || false}
              onChange={handleChange}
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
  );
}

export default CP;
