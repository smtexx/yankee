import { RegisteredOrder } from './Order';
import { Product } from './Product';

export interface UnregisteredUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

export interface User_DB extends UnregisteredUser {
  orders: RegisteredOrder[];
  favorites: Product['id'][];
  login: string;
  password: string;
}

export interface User_Client extends UnregisteredUser {
  orders: RegisteredOrder[];
  favorites: Product[];
}
