import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadResponse, UserType, login } from '../slices/authSlice';
import { RootState } from '..';
import axios from '@/axios';
import { responseError } from '@/utils/error';

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  PayloadResponse,
  Credentials,
  { state: RootState }
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post<PayloadResponse>('/auth/signin', {
      email,
      password,
    });
    const user = response.data as PayloadResponse;
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(responseError(error));
  }
});
