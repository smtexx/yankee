import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadResponseError, getUrl } from 'redux/helpers';
import { mockFetch } from 'server/server';
import {
  AppState,
  ExchangeRate,
  Method,
  Path,
  Product,
  RegisteredOrder,
  RegisteredUser,
  UnregisteredUser,
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

  if (response.ok) {
    return (await response.json()) as U;
  }

  throw new BadResponseError(response.status);
}

export const registerUser = createAsyncThunk<
  {
    user: RegisteredUser;
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
    user: registeredUser as RegisteredUser,
    authData: {
      login,
      password,
    },
  };
});

export const updateUserData = createAsyncThunk<
  RegisteredUser,
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
  { user: RegisteredUser; authData: AppState['authData'] },
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
    user: registeredUser as RegisteredUser,
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
  Product['id'][],
  {
    login: string;
    password: string;
    productID: string;
  }
>('@state/addToFavorites', async ({ login, password, productID }) => {
  return await sendRequest(
    getUrl(Path.user, Path.favorites, productID),
    login,
    password,
    Method.GET,
    {}
  );
});

export const deleteFromFavorites = createAsyncThunk<
  Product['id'][],
  {
    login: string;
    password: string;
    productID: string;
  }
>(
  '@state/deleteFromFavorites',
  async ({ login, password, productID }) => {
    return await sendRequest(
      getUrl(Path.user, Path.favorites, productID),
      login,
      password,
      Method.DELETE,
      {}
    );
  }
);

export const getUserFavorites = createAsyncThunk<
  Product[],
  {
    login: string;
    password: string;
  }
>('@state/getUserFavorites', async ({ login, password }) => {
  return await sendRequest(
    getUrl(Path.user, Path.favorites),
    login,
    password,
    Method.GET,
    {}
  );
});

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
    return await response.json();
  }

  throw new BadResponseError(response.status);
});

export const getExchangeRates = createAsyncThunk(
  '@state/subscribe',
  async () => {
    const response = await mockFetch(getUrl(Path.exchange));

    if (response.ok) {
      return (await response.json()) as ExchangeRate;
    }

    throw new BadResponseError(response.status);
  }
);
