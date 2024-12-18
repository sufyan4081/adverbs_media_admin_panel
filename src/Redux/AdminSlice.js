import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

const adminDetails = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAdminData: (state, action) => {
      state.admin = action.payload;
    },
    resetAdminData: () => initialState,
  },
});

export const { getAdminData, resetAdminData } = adminDetails.actions;
export default adminDetails.reducer;
