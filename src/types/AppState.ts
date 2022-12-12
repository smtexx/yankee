import { Product, SoldProduct } from './Product';
import { User } from './User';

export type Lang = 'EN' | 'RU';
export type Currency = 'USD' | 'EUR' | 'RUB';

export interface AppState {
  lang: Lang;
  currency: Currency;
  user: User | null;
  cart: SoldProduct[];
  favorite: Product['id'][];
}
