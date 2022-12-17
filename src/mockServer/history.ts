import { RegisteredOrder } from 'types';

export const history: RegisteredOrder[] = [
  {
    id: '342',
    date: new Date(2022, 3, 4),
    payment: 'CASH_ON_DELIVERY',
    status: 'COMPLETED',
    shipping: 'PICKUP',
    products: [
      { id: '2', color: 'black', price: 115, size: 'M', quantity: 1 },
      { id: '5', color: 'beige', price: 76, size: 'S', quantity: 2 },
    ],
  },
  {
    id: '376',
    date: new Date(2022, 3, 7),
    payment: 'CARD',
    status: 'CANCELLED',
    shipping: 'POST',
    products: [
      { id: '3', color: 'gray', price: 64, size: 'XS', quantity: 1 },
    ],
  },
  {
    id: '638',
    date: new Date(2022, 11, 9),
    payment: 'CARD',
    status: 'PROCESSING',
    shipping: 'DHL',
    products: [
      { id: '6', color: 'violet', price: 95, size: 'L', quantity: 2 },
      {
        id: '9',
        color: 'white',
        price: 98,
        size: 'XXS',
        quantity: 1,
      },
    ],
  },
];
