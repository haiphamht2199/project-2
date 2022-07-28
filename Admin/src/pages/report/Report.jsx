import axiosIntance from "../../helper/axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./report.css";
import { getProduct1, getProduct2 } from "../../Action";
const Report = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product1);
  const products1 = useSelector((state) => state.product.products1);

  let _product = {};
  let product3sp = [];

  if (product && product.products && product.products.length) {
    _product = product.products[0];
  }
  if (products1 && products1.products && products1.products.length) {
    product3sp = products1.products;
  }
  // console.log("product3sp:", product3sp);
  const orders = useSelector((state) => state.order.orders);
  const products = useSelector((state) => state.product.products.products);
  const total = orders.reduce((a, c) => a + c.totalAmount, 0);
  const totalProducts =
    orders &&
    orders.reduce((a, c) => a + c.items.reduce((b, d) => b + d.quantity, 0), 0);
  let number = 0;
  if (products && products.length) {
    number = products.reduce((a, c) => a + c.daBan, 0);
  }
  var numberOrder = orders.length;
  useEffect(() => {
    dispatch(getProduct1());
  }, [product]);
  useEffect(() => {
    dispatch(getProduct2());
  }, []);
  return (
    _product && (
      <div className="report">
        <h1 style={{ paddingLeft: "329px" }}> Báo cáo & thống kê</h1>
        <div
          className="reportq"
          style={{
            border: "1px solid black",
            margin: "2px 5px",
            marginBottom: "15px",
          }}
        >
          <div className="featured">
            <div className="featuredItem">
              <span className="featuredTitle">Đơn hàng:</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{numberOrder}</span>
              </div>
            </div>

            <div className="featuredItem">
              <span className="featuredTitle">Doanh thu: </span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{total} $</span>
              </div>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">Đã bán:</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{totalProducts}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="report1"
          style={{ border: "1px solid black", margin: "2px 5px" }}
        >
          <div className="featured">
            <div className="featuredItem">
              <span className="featuredTitle">
                Sản phẩm 3 sp bán chạy nhất:
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney"></span>
              </div>
              <div style={{ display: "flex" }}>
                {product3sp &&
                  product3sp.map((item) => (
                    <div style={{ maginLeft: "10px" }}>
                      <img className="product" src={item.imageProduct} alt="" />
                      <h2>{item.name}</h2>
                      <div className="featuredMoneyContainer">
                        <span style={{ color: "red", fontSize: "17px" }}>
                          {" "}
                          Số lượng:{" "}
                        </span>
                        <span
                          className="featuredMone"
                          style={{ color: "red", fontSize: "17px" }}
                        >
                          {item.daBan}
                        </span>
                      </div>
                      <div className="featuredMoneyContainer">
                        <span style={{ color: "red", fontSize: "17px" }}>
                          {" "}
                          Doanh số:{" "}
                        </span>
                        <span
                          className="featuredMone"
                          style={{ color: "red", fontSize: "17px" }}
                        >
                          {item.daBan * item.price}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">
                Sản phẩm bán có doanh số cao nhất:{" "}
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney"></span>
              </div>
              <div>
                <img className="product" src={_product.imageProduct} alt="" />
                <h2>{_product.name}</h2>
                <div className="featuredMoneyContainer">
                  <span style={{ color: "red", fontSize: "17px" }}>
                    {" "}
                    Số lượng:{" "}
                  </span>
                  <span
                    className="featuredMone"
                    style={{ color: "red", fontSize: "17px" }}
                  >
                    {_product.daBan}
                  </span>
                </div>
                <div className="featuredMoneyContainer">
                  <span style={{ color: "red", fontSize: "17px" }}>
                    {" "}
                    Doanh số:{" "}
                  </span>
                  <span
                    className="featuredMone"
                    style={{ color: "red", fontSize: "17px" }}
                  >
                    {_product.daBan * _product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Report;
