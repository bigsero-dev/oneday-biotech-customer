import { createSlice } from "@reduxjs/toolkit";
import type { UserDataType, UserHospitalType, UserLoginType } from "types/UserTypes";

export type PersistState = {
  token: string;
  dataLoading: boolean;
  userData: UserDataType;
  userHospital: UserHospitalType;
};

export const persistSlice = createSlice({
  name: "persist",
  initialState: {
    dataLoading: false,
    token: "",
    userData: {} as UserDataType,
    userHospital: {} as UserHospitalType,
  } as PersistState,
  reducers: {
    onPostLoginToken: (state, action: { payload: UserLoginType }) => {
      state.token = action.payload.accessToken;
      // state.userData = action.payload.user;
    },
    onPostUser: (state, action: { payload: UserDataType }) => {
      state.userData = action.payload;
    },
    onResetPersist: state => {
      state.token = "";
      state = {} as PersistState;
    },
    onSaveHospital: (state, action: { payload: UserHospitalType }) => {
      state.userHospital = action.payload;
    },
  },
});

export const { onPostLoginToken, onResetPersist, onPostUser, onSaveHospital } = persistSlice.actions;

export default persistSlice.reducer;
