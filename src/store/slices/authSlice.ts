import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authAsync';
import {
  toastError,
  toastLoading,
  toastSuccess,
} from '@/components/atoms/Toast';

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
        toastLoading('Login process...', 'login');
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        toastSuccess('Login success', 'login');
        state.isLoading = false;
        state.isAuth = true;
        state.user = {
          email: action.payload.email,
          username: action.payload.username,
          image: action.payload.image,
          role: action.payload.role,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        // @ts-ignore
        switch (action.payload?.statusCode) {
          case 400:
            toastError('Login failed, Incorrect email or password.', 'login');
            break;
          case 403:
            toastError('Login failed, Email has not been verified.', 'login');
            break;
          case 500:
            toastError('Login failed, Internal server error.', 'login');
            break;
          default:
            // @ts-ignore
            toastError(`Login failed, ${action.payload?.message}`, 'login');
            break;
        }

        state.isLoading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
