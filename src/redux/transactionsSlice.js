import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
  transactions: [],
  loading: false
};

export const addTransaction = createAsyncThunk('transactions/add', async (transaction) => {
  const response = await axios.post('/transactions/add-transaction', transaction);

  return response.data;
});
export const getAllTransactions = createAsyncThunk('transactions/getAllTransactions', async () => {
  const response = await axios.get('/transactions/get-transactions');

  return response.data;
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.loading = false;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.loading = false;
    });
  }
});

export default transactionsSlice.reducer;
