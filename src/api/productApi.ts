import { Product } from '@/types';
import axiosClient from './axiosClient';

export type RangePrice = {
  salePrice_gte: number;
  salePrice_lte: number;
};

export type ProductQueryParams = {
  _page: number;
  _start: number;
  _limit: number;
  _sort: string;
  isFreeShip: boolean;
  isPromotion: boolean;
  'category.id': number;
} & RangePrice;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type PaginationResponse<T> = {
  data: T[];
  pagination: Pagination;
};

const productApi = {
  async getAll(
    params: Partial<ProductQueryParams>
  ): Promise<PaginationResponse<Product>> {
    const newParams = { ...params };
    // transform _page to _start
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 12);

    // remove un-needed key
    delete newParams._page;

    // fetch productList + count
    const { data: productList } = await axiosClient.get<Product[]>(
      '/products',
      {
        params: newParams,
      }
    );
    const { data: count } = await axiosClient.get<number>('/products/count', {
      params: newParams,
    });

    return {
      data: productList,
      pagination: {
        page: params._page as number,
        limit: params._limit as number,
        total: count,
      },
    };
  },
  get(id: string) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
