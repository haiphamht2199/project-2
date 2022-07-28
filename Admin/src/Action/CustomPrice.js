import axios from "../helper/axios";
export const CustomPrice = (data) => {
 console.log(data)
 return async (dispatch) => {
  const res = await axios.post(`/admin/cp`, data);
  if (res.status === 201) {
   dispatch({
    type: "UPDATE_CP_SUCCESS",
    payload: res.data
   });
  }
 }
}
export const getCustomPrice = () => {

 return async (dispatch) => {
  const res = await axios.get(`/admin/getCp`,);
  if (res.status === 200) {
   dispatch({
    type: "GET_ALL_CP_SUCCESS",
    payload: res.data
   });
  }
 }
}