import { createSlice } from "@reduxjs/toolkit";

export type NotificationState = {
    isGetNotification: boolean;
};

export const notificationSlice = createSlice({
    name: "persist",
    initialState: {
        isGetNotification: true,
    } as NotificationState,
    reducers: {
        onGetNotification: (state, action) => {
            state.isGetNotification = action.payload
        }
    },
});

export const { onGetNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
