import { Lang } from 'redux/features/appState/initialState';

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
  novelty: boolean;
  bestseller: boolean;
  inSale: boolean;
  raiting: number;
} & {
  [Key in Lang]: Description;
};

export interface SoldProduct {
  id: Product['id'];
  price: Product['price'];
  size: Size;
  color: Color;
  quantity: number;
}
