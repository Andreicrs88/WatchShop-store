import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  backdropIsVisible: false,
}

const backdropSlice = createSlice({
  name: "backdrop",
  initialState: initialState,
  reducers: {
    showBackdrop(state) {
      state.backdropIsVisible = true;
    },
    hideBackdrop(state) {
      state.backdropIsVisible = false;
    } 
  }
})

export const backdropActions = backdropSlice.actions;

export default backdropSlice;