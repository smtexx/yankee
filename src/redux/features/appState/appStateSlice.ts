import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Currency,
  Lang,
  Product,
  RegisteredUser,
  SoldProduct,
} from 'types';
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
    setUser(state, action: PayloadAction<RegisteredUser>) {
      state.user = action.payload;
    },
    addToCart(state, action: PayloadAction<SoldProduct>) {
      state.cart.push(action.payload);
    },
  },
});

export default appStateSlice.reducer;
export const { addToCart, setCurrency, setLang, setUser } =
  appStateSlice.actions;
