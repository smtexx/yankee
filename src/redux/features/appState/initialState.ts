import { AppState } from 'types';

export const initialState: AppState = {
  lang: 'EN',
  currency: 'USD',
  user: null,
  cart: [],
  authData: null,
  exchangeRates: null,
  message: null,
};
