import { createStore } from 'redux';
import { rootReducer } from 'fast-redux';

export const initStore = (initialState = {}) => {
  return createStore(rootReducer, initialState);
};
