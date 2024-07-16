import { createSlice } from "@reduxjs/toolkit";

export type NotificationState = {
    isGetNotification: boolean;
    countUnRead: number;
};

export const notificationSlice = createSlice({
    name: "persist",
    initialState: {
        isGetNotification: true,
        countUnRead: 0
    } as NotificationState,
    reducers: {
        onGetNotification: (state, action) => {
            state.isGetNotification = action.payload
        },
        onGetUnreadNotification: (state, action) => {
            state.countUnRead = action.payload
        },
    },
});

export const { onGetNotification, onGetUnreadNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
