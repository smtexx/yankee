import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { Color, PriceRange, Product, Size, SortBy } from 'types';
import { initialState } from './initialState';
import { fetchProductsByCategory } from './thunks';

const appDataSlice = createSlice({
  name: '@data',
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
  extraReducers(builder) {
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.status = 'LOADING';
    });
    builder.addCase(fetchProductsByCategory.rejected, (state) => {
      state.status = 'ERROR';
    });
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action) => {
        const products: {
          array: Product[];
          entries: Record<Product['id'], Product>;
        } = {
          array: action.payload,
          entries: {},
        };
        products.array.forEach(
          (product) => (products.entries[product.id] = product)
        );
        state.products = products;
        state.status = 'IDLE';
      }
    );
  },
});

export default appDataSlice.reducer;
export const { setColor, setPriceRange, setSize, setSortBy } =
  appDataSlice.actions;
