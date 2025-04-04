import axiosClient from '@/api/axios-client';
import { TApiResponse } from '@/types/api-response.type';
import { AxiosRequestConfig } from 'axios';

const SERVICE_NAME = 'customers';

export async function getAllCustomers<T>(config?: AxiosRequestConfig): Promise<TApiResponse<T[]>> {
  const response = await axiosClient.get<TApiResponse<T[]>>(SERVICE_NAME, config);
  return response.data;
}
