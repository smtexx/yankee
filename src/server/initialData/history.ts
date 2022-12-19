import { RegisteredOrder } from 'types';

export const history: RegisteredOrder[] = [
  {
    id: '342',
    date: new Date(2022, 3, 4).toString(),
    payment: 'CASH_ON_DELIVERY',
    status: 'COMPLETED',
    shipping: 'PICKUP',
    products: [
      {
        id: '2',
        color: 'black',
        price: 115,
        size: 'M',
        quantity: 1,
        EN: 'Ultralight jacket',
        RU: 'Пуховик ультралегкий',
      },
      {
        id: '5',
        color: 'beige',
        price: 76,
        size: 'S',
        quantity: 2,
        EN: 'Down Jacket',
        RU: 'Пуховик',
      },
    ],
  },
  {
    id: '376',
    date: new Date(2022, 3, 7).toString(),
    payment: 'CARD',
    status: 'CANCELLED',
    shipping: 'POST',
    products: [
      {
        id: '3',
        color: 'gray',
        price: 64,
        size: 'XS',
        quantity: 1,
        RU: 'Куртка утепленная',
        EN: 'Insulated jacket',
      },
    ],
  },
];
