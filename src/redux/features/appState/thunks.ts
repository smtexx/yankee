import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadResponseError, getUrl } from 'redux/helpers';
import { mockFetch } from 'server/Server';
import {
  AppState,
  ExchangeRate,
  Method,
  Path,
  Product,
  RegisteredOrder,
  StatusCode,
  UnregisteredUser,
  User_Client,
} from 'types';

async function sendRequest<T, U>(
  url: string,
  login: string,
  password: string,
  method: Method,
  body: T
): Promise<U> {
  const response = await mockFetch(url, {
    method: method,
    headers: {
      Authorization: `Basic ${btoa(`${login}:${password}`)}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === StatusCode.NO_CONTENT) {
    return {} as U;
  }

  if (response.ok && response.status === StatusCode.OK) {
    return (await response.json()) as U;
  }

  throw new BadResponseError(response.status);
}

export const registerUser = createAsyncThunk<
  {
    user: User_Client;
    authData: AppState['authData'];
  },
  {
    login: string;
    password: string;
    user: UnregisteredUser;
  }
>('@state/registerUser', async ({ login, password, user }) => {
  const registeredUser = await sendRequest(
    getUrl(Path.user),
    login,
    password,
    Method.PUT,
    user
  );

  return {
    user: registeredUser as User_Client,
    authData: {
      login,
      password,
    },
  };
});

export const updateUserData = createAsyncThunk<
  User_Client,
  {
    login: string;
    password: string;
    user: UnregisteredUser;
  }
>('@state/updateUserData', async ({ login, password, user }) => {
  return await sendRequest(
    getUrl(Path.user),
    login,
    password,
    Method.PATCH,
    user
  );
});

export const changePassword = createAsyncThunk<
  string,
  {
    login: string;
    password: string;
    newPassword: string;
  }
>(
  '@state/changePassword',
  async ({ login, password, newPassword }) => {
    await sendRequest(
      getUrl(Path.user, Path.password),
      login,
      password,
      Method.PATCH,
      { password: newPassword }
    );
    return newPassword;
  }
);

export const signIn = createAsyncThunk<
  { user: User_Client; authData: AppState['authData'] },
  {
    login: string;
    password: string;
  }
>('@state/signIn', async ({ login, password }) => {
  const registeredUser = await sendRequest(
    getUrl(Path.user, Path.sign),
    login,
    password,
    Method.GET,
    {}
  );

  return {
    user: registeredUser as User_Client,
    authData: { login, password },
  };
});

export const createOrder = createAsyncThunk<
  RegisteredOrder,
  {
    login: string;
    password: string;
    order: UnregisteredUser;
  }
>('@state/createOrder', async ({ login, password, order }) => {
  return await sendRequest(
    getUrl(Path.user, Path.orders),
    login,
    password,
    Method.PUT,
    order
  );
});

export const addToFavorites = createAsyncThunk<
  Product,
  {
    login: string;
    password: string;
    product: Product;
  }
>('@state/addToFavorites', async ({ login, password, product }) => {
  await sendRequest(
    getUrl(Path.user, Path.favorites, product.id),
    login,
    password,
    Method.GET,
    {}
  );
  return product;
});

export const deleteFromFavorites = createAsyncThunk<
  string,
  {
    login: string;
    password: string;
    productID: string;
  }
>(
  '@state/deleteFromFavorites',
  async ({ login, password, productID }) => {
    await sendRequest(
      getUrl(Path.user, Path.favorites, productID),
      login,
      password,
      Method.DELETE,
      {}
    );

    return productID;
  }
);

export const subscribe = createAsyncThunk<
  {},
  {
    email: string;
  }
>('@state/subscribe', async ({ email }) => {
  const response = await mockFetch(getUrl(Path.subscribe), {
    method: Method.POST,
    headers: {},
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return {};
  }

  throw new BadResponseError(response.status);
});

export const getExchangeRates = createAsyncThunk(
  '@state/getExchangeRates',
  async () => {
    const response = await mockFetch(getUrl(Path.exchange));

    if (response.ok) {
      return (await response.json()) as ExchangeRate;
    }

    throw new BadResponseError(response.status);
  }
);
