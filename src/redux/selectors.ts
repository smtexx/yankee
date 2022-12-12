import { createSelector } from '@reduxjs/toolkit';
import { Product } from 'types';
import { RootState } from './store';

export const selectLang = (state: RootState) => state.values.lang;
export const selectCart = (state: RootState) => state.values.cart;
export const selectCurrentUser = (state: RootState) =>
  state.values.user;
export const selectCurrency = (state: RootState) =>
  state.values.currency;

export const selectColorFilter = (state: RootState) =>
  state.data.filters.color;
export const selectPriceFilter = (state: RootState) =>
  state.data.filters.price;
export const selectSizeFilter = (state: RootState) =>
  state.data.filters.size;
export const selectSortByFilter = (state: RootState) =>
  state.data.filters.sortBy;

export const selectProducts = createSelector(
  selectColorFilter,
  selectPriceFilter,
  selectSizeFilter,
  selectSortByFilter,
  (state: RootState) => state.data.products.array,
  (color, price, size, sortBy, products) => {
    const filtered: Product[] = products.filter((product) => {
      const checks: boolean[] = [];

      if (color) {
        checks.push(product.colors.includes(color));
      }
      if (size) {
        checks.push(product.size.includes(size));
      }
      checks.push(
        price[0] < product.price || price[1] > product.price
      );

      return checks.includes(false);
    });

    let sortFunc: (a: Product, b: Product) => number;

    switch (sortBy) {
      case 'RAITING':
        sortFunc = (a, b) => a.raiting - b.raiting;
        break;
      case 'PRICE_UP':
        sortFunc = (a, b) => a.price - b.price;
        break;
      case 'PRICE_DOWN':
        sortFunc = (a, b) => b.price - a.price;
        break;
    }

    return filtered.sort(sortFunc);
  }
);

export const selectFavorites = createSelector(
  (state: RootState) => state.values.favorite,
  (state: RootState) => state.data.products.array,
  (ids, products) =>
    ids.map((id) => products.find((product) => product.id === id))
);
