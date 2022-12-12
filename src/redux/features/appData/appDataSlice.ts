import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { Color, PriceRange, Size, SortBy } from 'types';
import { initialState } from './initialState';

const appDataSlice = createSlice({
  name: '@state',
  initialState: initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.filters.color = action.payload;
    },
    setPriceRange(state, action: PayloadAction<PriceRange>) {
      state.filters.price = action.payload;
    },
    setSize(state, action: PayloadAction<Size>) {
      state.filters.size = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.filters.sortBy = action.payload;
    },
  },
});

export default appDataSlice.reducer;
export const { setColor, setPriceRange, setSize, setSortBy } =
  appDataSlice.actions;
