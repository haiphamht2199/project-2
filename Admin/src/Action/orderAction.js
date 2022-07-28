import axios from "../helper/axios";
import { orderConstants } from "./Constans"

export const getAllOrder = () => {
 return async (dispatch) => {
  try {
   dispatch({ type: orderConstants.GET_ALL_ORDER_REQUEST });
   const res = await axios.get(`/admin/orders`);
   if (res.status === 200) {
    const orders = res.data.orders;
    dispatch({
     type: orderConstants.GET_ALL_ORDER_SUCCESS,
     payload: orders
    })
   } else {
    dispatch({ type: orderConstants.GET_ORDER_BY_ID_FAILURE })
   }

  } catch (error) {
   console.log({ error })
  }
 }
}
export const getOrderById = (payload) => {
 return async (dispatch) => {

  try {

   dispatch({ type: orderConstants.GET_ORDER_BY_ID_REQUEST });
   const res = await axios.post(`/admin/order`, {
    payload,
   });
   if (res.status === 200) {
    dispatch({
     type: orderConstants.GET_ORDER_BY_ID_SUCCESS,
     payload: { order: res.data.order }
    })
   } else {
    const { error } = res.data;
    dispatch({
     type: orderConstants.GET_ORDER_BY_ID_FAILURE,
     payload: {
      error,
     },
    });
   }


  } catch (error) {
   console.log(error);
  }
 }
}
export const updateOrder = (payload) => {
 return (dispatch) => {
  dispatch({ type: orderConstants.UPDATE_ORDER_BY_ID_REQUEST });
  try {
   console.log(payload);
   const res = axios.post(`/admin/order/update`, {
    payload
   });
   console.log(res);
   if (res.status === 201) {
    dispatch({ type: orderConstants.UPDATE_ORDER_BY_ID_SUCCESS });
    dispatch(getOrderById(payload.orderId));
   } else {
    const { error } = res.data;
    dispatch({
     type: orderConstants.UPDATE_ORDER_BY_ID_FAILURE,
     payload: { error },
    });
   }


  } catch (error) {
   console.log({ error })
  }
 }
}