import { deepCopy } from 'redux/helpers';
import { PriceRange } from 'types';
import reducer, {
  setColor,
  setPriceRange,
  setSize,
  setSortBy,
} from './appDataSlice';
import { initialState } from './initialState';

const defaultState = deepCopy(initialState);

describe('Set filters', () => {
  test('Set color filter', () => {
    const newState = reducer(defaultState, setColor('blue'));
    expect(newState.filters.color).toBe('blue');
  });
  test('Set price range filter', () => {
    const priceRange: PriceRange = [20, 100];
    const newState = reducer(defaultState, setPriceRange(priceRange));
    expect(newState.filters.price).toEqual(priceRange);
  });
  test('Set price size filter', () => {
    const newState = reducer(defaultState, setSize('M'));
    expect(newState.filters.size).toEqual('M');
  });
  test('Set sort by filter', () => {
    const newState = reducer(defaultState, setSortBy('PRICE_UP'));
    expect(newState.filters.sortBy).toEqual('PRICE_UP');
  });
});
