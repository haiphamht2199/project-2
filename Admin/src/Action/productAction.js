import axios from "../helper/axios";
import { productConstants } from "./Constans";

export const AddProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
    try {
      const user = window.localStorage.getItem('user');
      const clone = JSON.parse(user);
      let des = product.decription;
      const res = await axios.post('/admin/product/create', { ...product, user: clone, des });
      if (res.status === 200) {
        dispatch({
          type: productConstants.ADD_PRODUCT_SUCCESS,
          payload: { product: res.data.product }
        })
      } else {
        dispatch({
          type: productConstants.ADD_PRODUCT_FAILURE,
          payload: res.data.error
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.get(`/admin/products`);
      console.log(res);
      if (res.status === 200) {
        const products = res.data;

        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });

      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductById = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
      const res = await axios.delete(`/admin/productId`, {
        data: { payload },
      });
      console.log("ksjdf", res);
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
          payload: { product: res.data.product }
        })
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
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
export const DeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const res = await axios.delete('/admin/product/delete', {
        data: { id }
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST })
      if (res.status === 200) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: { error }
        });
      }
    } catch (error) {

    }
  }
}
const getProduct1 = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
      const res = await axios.get(`/admin/sapbanchaynhat`);
      if (res.status === 200) {
        const products = res.data;

        dispatch({
          type: productConstants.GET_PRODUCT_SUCCESS,
          payload: { products },
        });

      } else {
        dispatch({ type: productConstants.GET_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const getProduct2 = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT1_REQUEST });
      const res = await axios.get(`/admin/top3sapbanchaynhat`);
      console.log("reshah:", res.data)
      if (res.status === 200) {
        const products = res.data;

        dispatch({
          type: productConstants.GET_PRODUCT1_SUCCESS,
          payload: { products },
        });

      } else {
        dispatch({ type: productConstants.GET_PRODUCT1_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export { getProducts, getProduct1, getProduct2 }