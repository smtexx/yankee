import { Currency } from './AppState';
import { Product } from './Product';
import { RegisteredUser } from './User';

export type Feature = keyof Pick<
  Product,
  'inSale' | 'new' | 'bestseller'
>;
export type StoragedUser = Omit<RegisteredUser, 'passBase64'> & {
  passBase64: string;
};
export type ExchangeRate = {
  [key in Currency]: number;
};
