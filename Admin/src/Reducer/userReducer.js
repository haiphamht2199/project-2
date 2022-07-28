import { userConstants } from "../Action/Constans";

const initialState = {
 users: [],
 user: [],
 loading: false,
 error: null
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
 // eslint-disable-next-line default-case
 switch (action.type) {
  case userConstants.GET_ALL_USERS_SUCCESS:
   state = {
    ...state,
    users: action.payload
   }
   break;
 }
 return state;
}