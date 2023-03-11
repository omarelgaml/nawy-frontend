import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
  merchants: [],
  loading: false
};

export const addMerchant = createAsyncThunk('merchants/add', async (merchant) => {
  const response = await axios.post('/marchants/add-merchant', merchant);

  return response.data;
});
export const getAllMerchants = createAsyncThunk('merchants/getAllMerchants', async () => {
  const response = await axios.get('/marchants/get-merchants');

  return response.data;
});

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMerchant.fulfilled, (state, action) => {
      state.merchants = action.payload.merchants;
      state.loading = false;
    });
    builder.addCase(getAllMerchants.fulfilled, (state, action) => {
      state.merchants = action.payload.merchants;
      state.loading = false;
    });
  }
});

export default merchantsSlice.reducer;
