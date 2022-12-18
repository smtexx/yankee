import { RegisteredOrder } from './Order';
import { Product } from './Product';

export interface UnregisteredUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

export interface RegisteredUser extends UnregisteredUser {
  orders: RegisteredOrder[];
  favorites: Product['id'][];
  login?: null;
  password?: null;
}
