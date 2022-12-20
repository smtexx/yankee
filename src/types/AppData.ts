import { Color, Product, Size } from './Product';

export type Status = 'LOADING' | 'ERROR' | 'IDLE';
export type SortBy = 'PRICE_UP' | 'PRICE_DOWN' | 'RAITING';
export type PriceRange = [number, number];

export interface AppData {
  status: Status;
  products: ProductsData;
  filters: {
    color: Color | null;
    price: PriceRange;
    size: Size | null;
    sortBy: SortBy;
  };
}

export interface ProductsData {
  array: Product[];
  entries: {
    [key: Product['id']]: Product;
  };
}
