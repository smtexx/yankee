import { productsData } from 'data/products';
import { AppData } from 'types';

export const initialState: AppData = {
  products: productsData,
  filters: {
    color: null,
    price: [0, Infinity],
    size: null,
    sortBy: 'RAITING',
  },
};
