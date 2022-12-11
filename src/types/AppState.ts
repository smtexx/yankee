import { Product } from './Product';
import { User } from './User';

export type Lang = 'en' | 'ru';
export type Currency = 'USD' | 'EUR' | 'RUB';

interface AppState {
  lang: Lang;
  currency: Currency;
  user: User | null;
  cart: Product[];
  favorite: Product[];
}
