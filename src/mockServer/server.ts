import {
  DB,
  FetchOptions,
  MockResponse,
  StatusCode,
  Path,
  Method,
  Category,
  Feature,
  UnregisteredUser,
  RegisteredUser,
  UnregisteredOrder,
} from 'types';
import { db } from './DB';

class Server {
  constructor(private db: DB, private dataExchangeDelay: number) {}

  private createResponseOk<U = any>(
    code: StatusCode,
    data: U
  ): MockResponse<'ok', typeof data> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          ok: true,
          status: code,
          json: () => {
            return new Promise((resolve) =>
              setTimeout(() => {
                resolve(data);
              }, this.dataExchangeDelay)
            );
          },
        });
      }, this.dataExchangeDelay)
    );
  }
  private createResponseErr(code: StatusCode): MockResponse<'error'> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ ok: false, status: code });
      }, this.dataExchangeDelay)
    );
  }
  private getAuthData(headers: Headers): {
    login: string;
    password: string;
  } {
    const authHeader = headers.get('Authorization');
    if (authHeader) {
      const encodedAuthData = authHeader.match(
        /(?<=Basic )[a-z0-9+/=]+$/i
      );
      if (encodedAuthData) {
        const decodedAuthData = atob(encodedAuthData[0]);
        const [login, password] = decodedAuthData.split(':');
        if (!login || !password) {
          throw new ServerError(
            'Unable to extract auth data from authorization header',
            StatusCode.FORBIDDEN
          );
        } else {
          return { login, password };
        }
      } else {
        throw new ServerError(
          'Wrong format of authorization header',
          StatusCode.FORBIDDEN
        );
      }
    } else {
      throw new ServerError(
        'Authorization header is missing',
        StatusCode.FORBIDDEN
      );
    }
  }
  private checkAuthData(
    login: string,
    password: string
  ): void | never {
    const user = this.db.getUser(login);
    if (user.password !== password) {
      throw new ServerError(
        'Password is not correct',
        StatusCode.FORBIDDEN
      );
    }
  }
  private parseAuthRequestBody<T>(
    options: FetchOptions,
    config: [string, PropTypes][]
  ): { login: string; password: string; body: T } {
    // Parse auth data
    const authData = this.getAuthData(options.headers);
    // Parse body
    let body;
    try {
      body = JSON.parse(options.body);
    } catch (error) {
      throw new ServerError(
        'Unable to parse request body',
        StatusCode.BAD_REQUEST
      );
    }
    // Check body
    assertObject<T>(body, config);

    return {
      ...authData,
      body,
    };
  }

  request(
    url: string,
    options: FetchOptions
  ): MockResponse<'ok'> | MockResponse<'error'> {
    try {
      const route = new URL(url);
      const paths = route.pathname
        .split('/')
        .filter((path) => path !== '');

      // GET:/product/category/name
      // Get products by category
      if (
        paths[0] === Path.products &&
        paths[1] === Path.category &&
        paths[2] &&
        options.method === Method.GET
      ) {
        return this.createResponseOk(
          StatusCode.OK,
          this.db.getProductsByCategory(paths[2] as Category)
        );
      }

      // GET:/products/feature/name
      // Get products by feature
      if (
        paths[0] === Path.products &&
        paths[1] === Path.feature &&
        paths[2] &&
        options.method === Method.GET
      ) {
        return this.createResponseOk(
          StatusCode.OK,
          this.db.getProductsByFeature(paths[2] as Feature)
        );
      }

      // PUT:/user
      // Create new user
      if (paths[0] === Path.user && options.method === Method.PUT) {
        // Get data from request
        const { login, password, body } =
          this.parseAuthRequestBody<UnregisteredUser>(options, [
            ['firstname', 'string'],
            ['lastname', 'string'],
            ['email', 'string'],
            ['phone', 'string'],
            ['address', 'string'],
          ]);

        // Check if already exist
        if (this.db.getUser(login)) {
          throw new ServerError(
            'This login is already taken',
            StatusCode.BAD_REQUEST
          );
        }

        // Save new user
        const storagedUser = this.db.createUser(
          login,
          password,
          body
        );

        // Send response
        return this.createResponseOk<RegisteredUser>(
          StatusCode.CREATED,
          {
            ...storagedUser,
            login: null,
            password: null,
          }
        );
      }

      // PATCH:/user
      // Update user
      if (paths[0] === Path.user && options.method === Method.PATCH) {
        // Get data from request
        const { login, password, body } =
          this.parseAuthRequestBody<UnregisteredUser>(options, [
            ['firstname', 'string'],
            ['lastname', 'string'],
            ['email', 'string'],
            ['phone', 'string'],
            ['address', 'string'],
          ]);

        // Check auth data
        this.checkAuthData(login, password);

        // Update user
        const storagedUser = this.db.updateUser(login, body);

        // Send response
        return this.createResponseOk<RegisteredUser>(StatusCode.OK, {
          ...storagedUser,
          login: null,
          password: null,
        });
      }

      // PATCH:/user/password
      // Change password
      if (
        paths[0] === Path.user &&
        paths[1] === Path.password &&
        options.method === Method.PATCH
      ) {
        const { login, password, body } = this.parseAuthRequestBody<{
          password: string;
        }>(options, [['password', 'string']]);

        // Check auth data
        this.checkAuthData(login, password);

        // Update password
        this.db.changePassword(login, body.password);

        // Send response
        return this.createResponseOk(StatusCode.NO_CONTENT, {});
      }

      // GET:/user/sign
      // Authorize user
      if (
        paths[0] === Path.user &&
        paths[1] === Path.sign &&
        options.method === Method.GET
      ) {
        // Get auth data from request
        const { login, password } = this.getAuthData(options.headers);

        // Check auth data
        this.checkAuthData(login, password);

        // Get user from DB
        const storagedUser = this.db.getUser(login);

        // Send response
        return this.createResponseOk(StatusCode.OK, {
          ...storagedUser,
          login: null,
          password: null,
        });
      }

      // PUT:/user/order
      // Create new order
      if (
        paths[0] === Path.user &&
        paths[1] === Path.orders &&
        options.method === Method.PUT
      ) {
        const { login, password, body } =
          this.parseAuthRequestBody<UnregisteredOrder>(options, [
            ['shipping', 'string'],
            ['payment', 'string'],
            ['status', 'string'],
            ['products', 'array'],
          ]);

        // Check auth data
        this.checkAuthData(login, password);

        // Add new order to user
        const registeredOrder = this.db.addOrder(login, body);

        // Send response
        return this.createResponseOk(
          StatusCode.CREATED,
          registeredOrder
        );
      }

      // GET:/user/order
      // Get user orders
      if (
        paths[0] === Path.user &&
        paths[1] === Path.orders &&
        options.method === Method.GET
      ) {
        const { login, password } = this.getAuthData(options.headers);

        // Check auth data
        this.checkAuthData(login, password);

        // Get orders from DB
        const userOrders = this.db.getOrders(login);

        // Send response
        return this.createResponseOk(StatusCode.OK, userOrders);
      }

      // GET:/user/favorites
      // Get user favorite products
      if (
        paths[0] === Path.user &&
        paths[1] === Path.favorites &&
        !paths[2] &&
        options.method === Method.GET
      ) {
        // Get auth data
        const { login, password } = this.getAuthData(options.headers);

        // Check auth data
        this.checkAuthData(login, password);

        // Get favorites from DB
        const userFavorites = this.db.getFavorites(login);

        // Send response
        return this.createResponseOk(StatusCode.OK, userFavorites);
      }

      // GET:/user/favorites/productID
      // Add product to favorites
      if (
        paths[0] === Path.user &&
        paths[1] === Path.favorites &&
        paths[2] &&
        options.method === Method.GET
      ) {
        // Get auth data
        const { login, password } = this.getAuthData(options.headers);

        // Check auth data
        this.checkAuthData(login, password);

        // Add to favorite
        const userFavorites = this.db.addToFavorite(login, paths[2]);

        // Send response
        return this.createResponseOk(StatusCode.OK, userFavorites);
      }

      // DELETE:/user/favorites/productID
      // Delete productID from user favorite products
      if (
        paths[0] === Path.user &&
        paths[1] === Path.favorites &&
        paths[2] &&
        options.method === Method.DELETE
      ) {
        // Get auth data
        const { login, password } = this.getAuthData(options.headers);

        // Check auth data
        this.checkAuthData(login, password);

        // Add to favorite
        const userFavorites = this.db.deleteFromFavorite(
          login,
          paths[2]
        );

        // Send response
        return this.createResponseOk(StatusCode.OK, userFavorites);
      }

      // POST:/subscribe
      // Subscribe user to news
      if (
        paths[0] === Path.subscribe &&
        options.method === Method.POST
      ) {
        // Parse body
        let body;
        try {
          body = JSON.parse(options.body);
        } catch (error) {
          throw new ServerError(
            'Unable to parse request body',
            StatusCode.BAD_REQUEST
          );
        }

        // Check body
        assertObject<{ email: string }>(body, [['email', 'string']]);
        this.db.subscribe(body.email);

        // Send response
        return this.createResponseOk(StatusCode.NO_CONTENT, {});
      }

      // GET:/exchange
      // Get exchange rates
      if (
        paths[0] === Path.exchange &&
        options.method === Method.GET
      ) {
        // Get rates from DB
        const rates = this.db.getCurrenciesRatio();
        // Send response
        return this.createResponseOk(StatusCode.OK, rates);
      }

      return this.createResponseErr(StatusCode.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      if (error instanceof ServerError) {
        return this.createResponseErr(error.statusCode);
      } else {
        return this.createResponseErr(StatusCode.SERVER_ERROR);
      }
    }
  }
}

type PropTypes =
  | 'boolean'
  | 'string'
  | 'number'
  | 'object'
  | 'null'
  | 'array';

function assertObject<T>(
  obj: any,
  config: [string, PropTypes][]
): asserts obj is T {
  for (const [key, value] of config) {
    if (value === 'array' && Array.isArray(obj[key])) {
      continue;
    }
    if (typeof obj[key] === value) {
      continue;
    }
    throw new ServerError(
      'Wrong format of received data',
      StatusCode.BAD_REQUEST
    );
  }
}

class ServerError extends Error {
  constructor(message: string, public statusCode: StatusCode) {
    super(`Server: ${message}`);
    this.name = 'ServerError';
  }
}

const server = new Server(db, 300);

export function mockFetch(
  url: string,
  options: {
    method: Method;
    headers: Record<string, string>;
    body: string;
  } = {
    method: Method.GET,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: '',
  }
): MockResponse<'ok'> | MockResponse<'error'> {
  // Set headers
  const headers = new Headers();
  Object.entries(options.headers).forEach(([key, value]) =>
    headers.set(key, value)
  );

  return server.request(url, {
    ...options,
    headers,
  });
}
