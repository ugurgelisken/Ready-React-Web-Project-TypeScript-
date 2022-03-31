import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';

import application from './application.store';
import pagination from './pagination.store';

const reducers = combineReducers({
  application,
  pagination,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['application', 'pagination'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export default store;
