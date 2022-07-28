
import { productConstants } from "../Action/Constans";

const initialState = {
  products: [],
  products1: [],
  product: [],
  product1: [],
  loading: false,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload
      }
      break;
    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload,
        loading: false
      }
      break;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        product: action.payload.product
      }
      break;
    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        product1: action.payload
      }
      break;
    case productConstants.GET_PRODUCT1_SUCCESS:
      state = {
        ...state,
        products1: action.payload
      }
      break;
  }
  return state;
}

