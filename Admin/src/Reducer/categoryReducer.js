import { categoryConstansts } from "../Action/Constans";

const initState = {
  categories: [],
  category: [],
  loading: false,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {

  // eslint-disable-next-line default-case
  switch (action.type) {
    case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;

      state = {
        ...state,
        categories: category,
        loading: false,
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case categoryConstansts.GET_CATEGORY_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.GET_CATEGORY_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        category: action.payload.category
      }
      break;
    case categoryConstansts.GET_CATEGORY_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
  }

  return state;
}