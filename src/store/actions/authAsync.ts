import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType, login } from '../slices/authSlice';
import { AxiosError } from 'axios';
import { RootState } from '..';
import axios from '@/axios';

interface UsersResponse {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  UserType,
  Credentials,
  { state: RootState }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/auth/signin', {
      email: credentials.email,
      password: credentials.password,
    });

    thunkAPI.dispatch(login(response.data));
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message);
  }
});
