export interface IHttpResponse<T = undefined> {
  status: number;
  data?: T;
}
