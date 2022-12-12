import { products } from 'data/products';
import { Color, Product, Size } from 'types';

export type SortBy = 'PRICE_UP' | 'PRICE_DOWN' | 'RAITING';

type Price = number | null;
export type PriceRange = [Price, Price];

export interface AppData {
  products: Product[];
  filters: {
    color: Color | null;
    price: PriceRange;
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
    sortBy: 'RAITING',
  },
};
