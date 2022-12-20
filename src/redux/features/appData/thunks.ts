import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadResponseError, getUrl } from 'redux/helpers';
import { mockFetch } from 'server/server';
import { Category, Product, Path, Feature, AppData } from 'types';

export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  Category | Feature,
  { state: { data: AppData } }
>(
  '@data/fetchProductsByCategory',
  async (category) => {
    const url = getUrl(Path.products, Path.category, category);
    const response = await mockFetch(url);

    if (response.ok) {
      return (await response.json()) as Product[];
    }

    throw new BadResponseError(response.status);
  },
  {
    condition: (_, api) => {
      const state = api.getState();
      const appStatus = state.data.status;
      if (appStatus === 'LOADING') {
        return false;
      }
    },
  }
);
