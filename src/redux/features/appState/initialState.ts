import { Product, User } from 'types';

export type Lang = 'en' | 'ru';
export type Currency = 'USD' | 'EUR' | 'RUB';

export interface AppState {
  lang: Lang;
  currency: Currency;
  user: User | null;
  cart: Product['id'][];
  favorite: Product['id'][];
}

export const initialState: AppState = {
  lang: 'en',
  currency: 'USD',
  user: null,
  cart: [],
  favorite: [],
};
