import axios from "../helper/axios";
import { userConstants } from "./Constans"

export const getAllUsers = () => {
 return async (dispatch) => {
  try {
   dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
   const res = await axios.get(`/admin/getAllUser`);
   console.log(res.data.users);
   if (res.status === 200) {
    const users = res.data.users;
    dispatch({
     type: userConstants.GET_ALL_USERS_SUCCESS,
     payload: users
    })
   } else {
    dispatch({ type: userConstants.GET_ALL_USERS_FAILURE })
   }

  } catch (error) {
   console.log({ error })
  }
 }
}