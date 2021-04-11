/**
 * Contains the dispatch function for different types of request regarding authorization
 */
import Cookies from 'js-cookie';
const userName = Cookies.get('userName'); 
export const initialState = {
  userDetails: (userName === undefined || userName === null)?"":userName,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload,
        loading: false
      };
    case "LOGOUT":
      return {
        userDetails: "",
        loading: false,
        errorMessage: null,
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};