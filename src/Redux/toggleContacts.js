import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleReducer: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export const { toggleReducer } = toggleSlice.actions;

export default toggleSlice.reducer;
