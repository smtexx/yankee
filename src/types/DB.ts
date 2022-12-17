import { db } from 'mockServer/DB';
import { Currency } from './AppState';
import { Product } from './Product';
import { RegisteredUser } from './User';

export type Feature = keyof Pick<
  Product,
  'inSale' | 'new' | 'bestseller'
>;
export type StoragedUser = RegisteredUser & {
  passBase64: string;
  login: string;
};
export type ExchangeRate = {
  [key in Currency]: number;
};

export type DB = typeof db;
