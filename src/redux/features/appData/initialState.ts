import { productsData } from 'data/products';
import { AppData } from 'types';

export const initialState: AppData = {
  products: productsData,
  filters: {
    color: null,
    price: [null, null],
    size: null,
    sortBy: 'RAITING',
  },
};
