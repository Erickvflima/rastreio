export interface IApiResponse<T = any, K = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  document?: K;
}
