import { Product, User } from 'types';

export type Lang = 'EN' | 'RU';
export type Currency = 'USD' | 'EUR' | 'RUB';

export interface AppState {
  lang: Lang;
  currency: Currency;
  user: User | null;
  cart: Product['id'][];
  favorite: Product['id'][];
}

export const initialState: AppState = {
  lang: 'EN',
  currency: 'USD',
  user: null,
  cart: [],
  favorite: [],
};
