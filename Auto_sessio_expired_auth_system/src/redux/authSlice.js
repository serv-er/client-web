import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.sessionExpired = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.sessionExpired = false;
    },
    expireSession: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.sessionExpired = true;
    },
  },
});

export const { login, logout, expireSession } = authSlice.actions;
export default authSlice.reducer;
