import { orderConstants } from "../Action/Constans";

const initialState = {
  orders: [],
  order: [],
  loading: false,
  error: null,
  success: false
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case orderConstants.GET_ALL_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload
      }
      break;
    case orderConstants.GET_ORDER_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case orderConstants.GET_ORDER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        order: action.payload.order
      }
      break;
    case orderConstants.GET_ORDER_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case orderConstants.UPDATE_ORDER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        order: action.payload.order,
        success: true
      }
  }
  return state;
}