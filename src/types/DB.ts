import { Currency } from './AppState';
import { Product } from './Product';

export type Feature = keyof Pick<
  Product,
  'inSale' | 'new' | 'bestseller'
>;

export type ExchangeRate = {
  [key in Currency]: number;
};
