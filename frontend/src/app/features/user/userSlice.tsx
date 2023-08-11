import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  email: "",
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      console.log("Payload" + action.payload);
      state.isLoggedIn = true;
      state.email = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
