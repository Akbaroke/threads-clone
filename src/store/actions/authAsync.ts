import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
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
    const response = await axios.post<UsersResponse>('/auth/signin', {
      email: credentials.email,
      password: credentials.password,
    });

    const user = response.data as unknown as UserType;
    thunkAPI.dispatch(login(user));

    // Fix the return value in the success case to ensure the correct type
    return user;
  } catch (error) {
    const err = error as AxiosError;

    // Fix the return type in the failure case to ensure the correct type
    return thunkAPI.rejectWithValue(err.message);
  }
});
