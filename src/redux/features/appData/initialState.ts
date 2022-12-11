import { products } from 'data/products';
import { Color, Product, Size } from 'types';
export type Price = number | null;
export type SortBy = 'price_UP' | 'price_DOWN' | 'raiting';

export interface AppData {
  products: Product[];
  filters: {
    color: Color | null;
    price: [Price, Price];
    size: Size | null;
    sortBy: SortBy;
  };
}

export const initialState: AppData = {
  products: products,
  filters: {
    color: null,
    price: [null, null],
    size: null,
    sortBy: 'raiting',
  },
};
