import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      pending: false,
      error: false,
    },
    roomById: [],
  },
  reducers: {
    signUpStart: (state) => {
      state.user.pending = true;
    },
    signUpError: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
    signUpSuccess: (state, action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.id = action.payload.id;
      state.user.lastName = action.payload.lastName;
      state.user.firstName = action.payload.firstName;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    },
    logoutRequest: (state, action) =>{
      state.user.id = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.password = '';
  },
    getRoomsById: (state, action) => {
      state.roomById = action.payload;
    },
  },
});
export const { signUpStart, signUpError, signUpSuccess, logoutRequest, getRoomsById } =
  userSlice.actions;
export default userSlice.reducer;
