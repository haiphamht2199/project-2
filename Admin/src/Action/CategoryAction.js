import axios from "../helper/axios";
import { categoryConstansts } from "./Constans";

const getAllCategory = () => {

 return async (dispatch) => {
  dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
  const res = await axios.get(`/admin/category/getcategory`);
  if (res.status === 200) {
   dispatch({
    type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
    payload: { categories: res.data }
   });

  }
 }
}
export const AddCate = (data) => {
 const user = window.localStorage.getItem('user')
 return async (dispatch) => {
  dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
  try {
   const clone = JSON.parse(user);
   const res = await axios.post(`/admin/category/create`, { ...data, user: clone });
   if (res.status === 201) {
    dispatch({
     type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
     payload: { category: res.data.category }
    });

   } else {
    dispatch({
     type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
     payload: res.data.error
    });
   }
  } catch (error) {
   console.log(error.response);
  }

 }
}
export const DeleteCategory = (payload) => {
 return async (dispatch) => {
  try {
   const res = await axios.delete(`/admin/category/delete`, {
    data: { payload },
   });
   dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
   if (res.status === 200) {
    dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
    dispatch(getAllCategory());
   } else {
    const { error } = res.data;
    dispatch({
     type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
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
export const getCategoryById = (payload) => {
 return async (dispatch) => {
  try {
   console.log(payload);
   dispatch({ type: categoryConstansts.GET_CATEGORY_BY_ID_REQUEST });
   const res = await axios.delete(`/admin/getcategoryById`, {
    data: { payload },
   });
   if (res.status === 200) {
    dispatch({
     type: categoryConstansts.GET_CATEGORY_BY_ID_SUCCESS,
     payload: { category: res.data.categ }
    })
   } else {
    const { error } = res.data;
    dispatch({
     type: categoryConstansts.GET_CATEGORY_BY_ID_FAILURE,
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
export {
 getAllCategory
}