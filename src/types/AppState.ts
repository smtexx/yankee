import { ExchangeRate } from './DB';
import { SoldProduct } from './Product';
import { User_Client } from './User';

export type Lang = 'EN' | 'RU';
export type Currency = 'USD' | 'EUR' | 'RUB';

export interface AppState {
  lang: Lang;
  currency: Currency;
  user: User_Client | null;
  cart: SoldProduct[];
  authData: {
    login: string;
    password: string;
  } | null;
  exchangeRates: ExchangeRate | null;
  message: string | null;
}
