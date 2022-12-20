import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadResponseError, getUrl } from 'redux/helpers';
import { mockFetch } from 'server/server';
import { Category, Product, Path, Feature } from 'types';

export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  Category | Feature
>('@data/fetchProductsByCategory', async (category) => {
  const url = getUrl(Path.products, Path.category, category);
  const response = await mockFetch(url);

  if (response.ok) {
    return (await response.json()) as Product[];
  }

  throw new BadResponseError(response.status);
});
