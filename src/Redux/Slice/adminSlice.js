import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setAdminLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;
