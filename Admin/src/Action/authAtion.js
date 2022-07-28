import { authConstants } from "./Constans"
import axios from "../helper/axios";
// import axios from "axios";
export const login = (user) => {

 return async (dispatch) => {
  const res = await axios.post(`/admin/signin`, {
   ...user
  });
  dispatch({
   type: authConstants.LOGIN_REQUEST,
   payload: {
    ...user
   }

  });
  if (res.status === 201) {
   const { token, user } = res.data;
   localStorage.setItem('token', token);
   localStorage.setItem('user', JSON.stringify(user));
   dispatch({
    type: authConstants.LOGIN_SUCCESS,
    payload: {
     token, user
    }
   })
  } else {
   if (res.status === 400) {
    dispatch({
     type: authConstants.LOGIN_FAILURE,
     payload: {
      payload: { error: res.error }
     }
    })
   }
  }
 }
}
export const isUserLoggedIn = () => {
 return async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
   const user = JSON.parse(localStorage.getItem('user'));
   dispatch({
    type: authConstants.LOGIN_SUCCESS,
    payload: {
     token, user
    }
   });
  } else {
   dispatch({
    type: authConstants.LOGIN_FAILURE,
    payload: { error: 'Failed to login' }
   });
  }
 }
}
