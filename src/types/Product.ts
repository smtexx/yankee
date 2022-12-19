import { Lang } from './AppState';

export type Size = 'XXS' | 'XS' | 'S' | 'M' | 'L';
export type Color =
  | 'beige'
  | 'white'
  | 'blue'
  | 'black'
  | 'violet'
  | 'blue'
  | 'pink'
  | 'gray'
  | 'silver'
  | 'green'
  | 'brown';

export type Category =
  | 'all'
  | 'jacket'
  | 'fur'
  | 'trench'
  | 'coat'
  | 'costume'
  | 'dress'
  | 'blouse'
  | 'skirt'
  | 'tshirt'
  | 'accessory';

interface Description {
  title: string;
  features: {
    fabric: string;
    lining: string;
    insulation: string;
    references: string[];
  };
  description: string;
}

export type Product = {
  id: string;
  category: Category;
  // USD by default
  price: number;
  size: Size[];
  colors: Color[];
  new: boolean;
  bestseller: boolean;
  inSale: boolean;
  raiting: number;
} & {
  [key in Lang]: Description;
};

export type SoldProduct = {
  id: Product['id'];
  price: Product['price'];
  size: Size;
  color: Color;
  quantity: number;
} & {
  // Product title
  [key in Lang]: string;
};
