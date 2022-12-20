export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Path {
  // /user
  user = 'user',
  // /user/orders
  orders = 'orders',
  // /user/sign
  sign = 'sign',
  // /user/favorites
  favorites = 'favorites',
  // /user/password
  password = 'password',
  // /products
  products = 'products',
  // /products/category
  category = 'category',
  // /subscribe
  subscribe = 'subscribe',
  // /exchange
  exchange = 'exchange',
}

export interface FetchOptions {
  method: Method;
  body: string;
  headers: Headers;
}

export type MockResponse<
  T extends 'error' | 'ok',
  U = unknown
> = T extends 'ok'
  ? Promise<{
      json: () => Promise<U>;
      ok: true;
      status: StatusCode;
    }>
  : Promise<{
      ok: false;
      status: StatusCode;
    }>;
