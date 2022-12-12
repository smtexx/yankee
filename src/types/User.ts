import { Order } from './Order';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  passwordHash: string;
  history: Order[];
}
