import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, 
  userId: null, 
  // token: null,
}

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
    storeCredentials(state, action) {
      state.userId = action.payload.userId;
      // state.token = action.payload.token;
    },
    removeCredentials(state) {
      state.isLoggedIn = false;
      state.userId  = null;
      // state.token = null;
  }
  }
});

export const authActions = authSlice.actions;

export default authSlice;