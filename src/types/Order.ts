import { SoldProduct } from './Product';

export type OrderStatus = 'PROCESSING' | 'CANCELLED' | 'COMPLETED';
export type Payment = 'CARD' | 'CASH_ON_DELIVERY';
export type Shipping = 'PICKUP' | 'DHL' | 'POST' | 'UPS';

export interface UnregisteredOrder {
  shipping: Shipping;
  payment: Payment;
  status: OrderStatus;
  products: SoldProduct[];
}

export interface RegisteredOrder extends UnregisteredOrder {
  id: string;
  date: Date;
}
