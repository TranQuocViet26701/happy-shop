import { RegisterData } from './types/index';
import userApi from '@/api/userApi';
import StorageKeys from '@/constants/storage-keys';
import { User } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginField } from './types';

export type UserState = {
  current: User;
  settings: {};
};

const initialState = {
  current: {},
  settings: {},
} as UserState;

// Thunk: login
export const login = createAsyncThunk(
  'user/login',
  async (payload: LoginField) => {
    const { data } = await userApi.login(payload);

    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return data.user;
  }
);

// Thunk: register
export const register = createAsyncThunk(
  'user/register',
  async (payload: RegisterData) => {
    const { data } = await userApi.register(payload);

    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    return data.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

// export const { logout } = userSlice.actions;

export default userSlice.reducer;
