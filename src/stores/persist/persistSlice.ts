import { createSlice } from "@reduxjs/toolkit";
import type { UserDataType, UserLoginType } from "types/UserTypes";

export type PersistState = {
  token: string;
  dataLoading: boolean;
  userData: UserDataType;
};

export const persistSlice = createSlice({
  name: "persist",
  initialState: {
    dataLoading: false,
    token: "",
    userData: {} as UserDataType,
  } as PersistState,
  reducers: {
    onPostLoginToken: (state, action: { payload: UserLoginType }) => {
      state.token = action.payload.accessToken;
      state.userData = action.payload.user;
    },
    onResetPersist: state => {
      state.token = "";
      state = {} as PersistState;
    },
  },
});

export const { onPostLoginToken, onResetPersist } = persistSlice.actions;

export default persistSlice.reducer;
