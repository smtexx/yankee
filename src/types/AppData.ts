import { Color, Product, Size } from './Product';

export type SortBy = 'PRICE_UP' | 'PRICE_DOWN' | 'RAITING';
export type PriceRange = [number, number];

export interface AppData {
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
  ids: {
    [key: string]: Product;
  };
}
