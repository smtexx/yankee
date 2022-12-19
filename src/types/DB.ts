import { Currency } from './AppState';
import { Product } from './Product';
import { RegisteredUser } from './User';

export type Feature = keyof Pick<
  Product,
  'inSale' | 'new' | 'bestseller'
>;
export type StoragedUser = RegisteredUser & {
  password: string;
  login: string;
};
export type ExchangeRate = {
  [key in Currency]: number;
};
