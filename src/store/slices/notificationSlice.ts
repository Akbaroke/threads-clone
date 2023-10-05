import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
}

const initialState: NotificationState = {
  message: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
