import { createSelector } from '@reduxjs/toolkit';
import { Product } from 'types';
import { RootState } from './store';

// Language and currency
export const selectLang = (state: RootState) => state.values.lang;
export const selectCurrency = (state: RootState) =>
  state.values.currency;

// User and cart
export const selectCurrentUser = (state: RootState) =>
  state.values.user;
export const selectCart = (state: RootState) => state.values.cart;

// Filters
export const selectColorFilter = (state: RootState) =>
  state.data.filters.color;
export const selectPriceFilter = (state: RootState) =>
  state.data.filters.price;
export const selectSizeFilter = (state: RootState) =>
  state.data.filters.size;
export const selectSortByFilter = (state: RootState) =>
  state.data.filters.sortBy;

// Products
export const selectAllProducts = (state: RootState) =>
  state.data.products.array;

export const selectProductByID = (
  state: RootState,
  id: Product['id']
) => state.data.products.ids[id];

const selectFilteredProducts = createSelector(
  selectColorFilter,
  selectPriceFilter,
  selectSizeFilter,
  selectAllProducts,
  (color, price, size, products) => {
    let filteredProducts: Product[] = products;

    if (color) {
      filteredProducts = products.filter((product) =>
        product.colors.includes(color)
      );
    }

    if (size) {
      filteredProducts = filteredProducts.filter((product) =>
        product.size.includes(size)
      );
    }

    if (price[0] !== 0 || price[1] !== Infinity) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price > price[0] && product.price < price[1]
      );
    }

    return filteredProducts;
  }
);

export const selectProducts = createSelector(
  selectSortByFilter,
  selectFilteredProducts,
  (sortBy, products) => {
    const sortedProducts: Product[] = [...products];

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

    return sortedProducts.sort(sortFunc);
  }
);

export const selectFavorites = createSelector(
  (state: RootState) => state.values.favorite,
  (state: RootState) => state.data.products.array,
  (ids, products) =>
    ids.map((id) => products.find((product) => product.id === id))
);

// Бестселлеры, распрадажа, новинки
export const selectBestsellers = createSelector(
  selectAllProducts,
  (products) => products.filter((product) => product.bestseller)
);

export const selectSalesProducts = createSelector(
  selectAllProducts,
  (prducts) => prducts.filter((product) => product.inSale)
);

export const selectNovelties = createSelector(selectAllProducts);
