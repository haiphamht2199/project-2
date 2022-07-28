import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import CustomPrice from './CustomPrice';
import orderReducer from './orderReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
 auth: authReducer,
 category: categoryReducer,
 product: productReducer,
 user: userReducer,
 order: orderReducer,
 customPrice: CustomPrice
});
export default rootReducer;