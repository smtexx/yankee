import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency, Lang, Product, SoldProduct, User } from 'types';
import { initialState } from './initialState';

const appStateSlice = createSlice({
  name: '@state',
  initialState: initialState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    addToCart(state, action: PayloadAction<SoldProduct>) {
      state.cart.push(action.payload);
    },
    addToFavorite(state, action: PayloadAction<Product['id']>) {
      state.favorite.push(action.payload);
    },
  },
});

export default appStateSlice.reducer;
export const {
  addToCart,
  addToFavorite,
  setCurrency,
  setLang,
  setUser,
} = appStateSlice.actions;
