import { LoginField, RegisterData } from '@/features/Auth/types';
import { User } from './../types/index';
import axiosClient from './axiosClient';

export interface LoginResponse {
  jwt: string;
  user: User;
}

const userApi = {
  register(data: RegisterData) {
    const url = '/auth/local/register';
    return axiosClient.post<LoginResponse>(url, data);
  },
  login(data: LoginField) {
    const url = '/auth/local';
    return axiosClient.post<LoginResponse>(url, data);
  },
};

export default userApi;
