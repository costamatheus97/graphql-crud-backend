export interface IHttpResponse<T = Record<string, unknown>> {
  status: number;
  data?: T;
}
