export type TApiResponse<T> = {
  message: string;
  data: T;
  pagination: TPaginationResponse;
};

export type TPaginationResponse = {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  countRecords: number;
};
