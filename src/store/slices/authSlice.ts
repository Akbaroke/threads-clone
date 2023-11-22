import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authAsync';

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: UserType | null;
}

export interface UserType {
  username: string;
  email: string;
  image: string;
  role: 'user' | 'admin';
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
