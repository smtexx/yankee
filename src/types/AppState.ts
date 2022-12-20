import { ExchangeRate } from './DB';
import { SoldProduct } from './Product';
import { RegisteredUser } from './User';

export type Lang = 'EN' | 'RU';
export type Currency = 'USD' | 'EUR' | 'RUB';

export interface AppState {
  lang: Lang;
  currency: Currency;
  user: RegisteredUser | null;
  cart: SoldProduct[];
  authData: {
    login: string;
    password: string;
  } | null;
  exchangeRates: ExchangeRate | null;
}
