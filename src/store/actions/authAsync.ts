import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { UserType, login } from '../slices/authSlice';
import { AxiosError } from 'axios';
import { RootState } from '..';
import axios from '@/axios';
import {
  toastError,
  toastLoading,
  toastSuccess,
} from '@/components/atoms/Toast';

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  UserType,
  Credentials,
  { state: RootState }
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  toastLoading('Login process...', 'login');
  toastLoading('Login process...', 'login');
  try {
    const response = await axios.post<UserType>('/auth/signin', {
      email,
      password,
    });

    const user = response.data as UserType;
    toastSuccess('Login success', 'login');

    // Fix the return value in the success case to ensure the correct type
    return user;
  } catch (error) {
    const err = error as AxiosError;
    console.log(error, ': error');

    toastError('Login failed', 'login');

    // Fix the return type in the failure case to ensure the correct type
    return thunkAPI.rejectWithValue(err.message);
  }
});