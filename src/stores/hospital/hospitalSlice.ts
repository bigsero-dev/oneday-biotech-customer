import { createSlice } from "@reduxjs/toolkit";
import type { UserHospitalType } from "types/UserTypes";

export type HospitalState = {
    userHospital: UserHospitalType;
};

export const hospitalSlice = createSlice({
    name: "hospital",
    initialState: {
        userHospital: {} as UserHospitalType,
    } as HospitalState,
    reducers: {
        onSaveHospital: (state, action: { payload: UserHospitalType }) => {
            state.userHospital = action.payload;
        },
    },
});

export const { onSaveHospital } = hospitalSlice.actions;

export default hospitalSlice.reducer;