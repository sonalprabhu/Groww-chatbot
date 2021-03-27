import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const authReducer = createSlice({
  name: 'users',
  initialState: {
        user:Cookies.get('user') || 'guest',
        userId:Cookies.get('userId') || ''
  },
  reducers: {
    logout: (state,action) => {
      state.user = 'guest';
      state.userId = '';
    },
    login: (state,action) => {
      state.user = action.payload.userName;
      state.userId = action.payload.userId;
    }
  }
})

// Action creators are generated for each case reducer function
export const { login,logout} = authReducer.actions

export default authReducer.reducer