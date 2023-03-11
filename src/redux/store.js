import { configureStore } from '@reduxjs/toolkit';
import merchantsReducer from './merchantsSlice';
import companiesReducer from './companiesSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    merchants: merchantsReducer,
    companies: companiesReducer,
    transactions: transactionsReducer
  }
});
