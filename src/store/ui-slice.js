import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {uiVisibility: false},
  reducers: {
    toggle(state, action) {
      state.uiVisibility = !state.uiVisibility;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
