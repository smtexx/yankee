import { Category, Translation } from 'types';

export const categoryNames: Translation<
  Category | 'inSale' | 'bestseller' | 'new'
> = {
  RU: {
    all: 'Все категории',
    jacket: 'Куртки',
    fur: 'Шубы',
    trench: 'Тренчи',
    coat: 'Пальто',
    costume: 'Костюмы',
    dress: 'Платья',
    blouse: 'Блузы',
    skirt: 'Юбки',
    tshirt: 'Футболки',
    accessory: 'Аксессуары',
    inSale: 'Распродажа',
    bestseller: 'Бестселлеры',
    new: 'Новинки',
  },
  EN: {
    all: 'All categories',
    jacket: 'Jackets',
    fur: 'Fur coats',
    trench: 'Trenches',
    coat: 'Coats',
    costume: 'Costumes',
    dress: 'Dresses',
    blouse: 'Blouses',
    skirt: 'Skirts',
    tshirt: 'T-shirts',
    accessory: 'Accessories',
    inSale: 'Sale',
    bestseller: 'Bestsellers',
    new: 'New',
  },
};
