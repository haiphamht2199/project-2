import React, { useEffect, useState } from "react";
import "./oederDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getOrderById,
  updateOrder,
  getAllOrder,
} from "../../Action/orderAction";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const OrderDetail = (props) => {
  const location = useLocation();
  const id = location.pathname.slice(13, location.pathname.length);
  const history = useHistory();
  const _order = useSelector((state) =>
    state.order.orders.find((order) => order._id === id)
  );
  const success = useSelector((state) => state.order.success);
  const dispatch = useDispatch();
  const [type, setType] = useState();

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  useEffect(() => {
    if (success) {
      toast.success("cập nhật đơn hàng thành công!");
    }
  }, [success]);

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
    // history.push(`/`);
    // toast.success('cập nhật đơn hàng thành công!');
  };
  return (
    <>
      {_order && (
        <div className="orderDetail">
          <h2>Chi tiết đơn hàng </h2>
          <div>
            <span className="title">Tên khách hàng: </span>
            <span className="title">
              {_order.user.firstName} {_order.user.lastName}
            </span>
          </div>
          <br />
          <div>
            <span className="title">Địa chỉ giao hàng: </span>
            <span className="title">{_order.adress} </span>
          </div>
          <br />
          <div>
            <span className="title">Số điện thoại: </span>
            <span className="title">{_order.phoneNumber} </span>
          </div>
          <br />
          <div>
            <span className="title">Hình thức thanh toán: </span>
            <span className="title">{_order.paymentType} </span>
          </div>
          <br />
          <table>
            <tr>
              <th style={{ paddingRight: "50px" }}>Tên Sản Phẩm</th>
              <th style={{ paddingRight: "50px" }}>Hình Ảnh</th>
              <th style={{ paddingRight: "50px" }}>Giá</th>
              <th style={{ paddingRight: "50px" }}>Số Lượng</th>
              <th style={{ paddingRight: "50px" }}>Thành Tiền($)</th>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>
                {_order.items.map((item, index) => (
                  <tr>{item.name}</tr>
                ))}
              </td>
              <td style={{ border: "1px solid black" }}>
                {_order.items.map((_item, index) => (
                  <tr>
                    <img
                      className="productImg"
                      src={_item.imageProduct}
                      alt=""
                    ></img>
                  </tr>
                ))}
              </td>
              <td style={{ border: "1px solid black" }}>
                {_order.items.map((_item, index) => (
                  <tr>{_item.price}</tr>
                ))}
              </td>
              <td style={{ border: "1px solid black" }}>
                {_order.items.map((_item, index) => (
                  <tr style={{ alignItems: "center" }}>{_item.quantity}</tr>
                ))}
              </td>
              <td style={{ border: "1px solid black" }}>
                {_order.totalAmount}
              </td>
            </tr>
          </table>
          <br />
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {_order.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date"></div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {_order.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <form onSubmit={() => onOrderUpdate(_order._id)}>
                <button
                  style={{ backgroundColor: "green", color: "white" }}
                  type="submit"
                >
                  confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
