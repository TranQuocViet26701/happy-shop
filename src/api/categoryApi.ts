import { Category } from './../types/index';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params?: any) {
    const url = '/categories';
    return axiosClient.get<Category[]>(url, { params });
  },
  get(id: number) {
    const url = `/categories/${id}`;
    return axiosClient.get<Category>(url);
  },
};

export default categoryApi;
