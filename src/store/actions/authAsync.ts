import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType, login } from '../slices/authSlice';
import axios, { AxiosError } from 'axios';
import { RootState } from '..';

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
    const response = await axios.post(`${process.env.SERVER_URL}`, {});

    thunkAPI.dispatch(login(user));
   
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message);
  }
});
