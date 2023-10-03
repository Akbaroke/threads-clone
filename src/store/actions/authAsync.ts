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
    const response = await axios.get('http://localhost:5000/users');

    const query = response.data.find(
      (user: UsersResponse) => user.email === credentials.email
    );
    if (query) {
      if (query.password === credentials.password) {
        const user: UserType = {
          email: query.email,
          username: query.username,
          image: 'https://avatars.githubusercontent.com/u/94231436?v=4',
          role: query.role,
        };
        thunkAPI.dispatch(login(user));
        return user;
      } else {
        throw new Error('Login failed');
      }
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message);
  }
});
