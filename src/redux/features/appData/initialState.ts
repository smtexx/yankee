import { AppData } from 'types';

export const initialState: AppData = {
  status: 'IDLE',
  products: {
    array: [],
    entries: {},
  },
  filters: {
    color: null,
    price: [0, Infinity],
    size: null,
    sortBy: 'RAITING',
  },
};
