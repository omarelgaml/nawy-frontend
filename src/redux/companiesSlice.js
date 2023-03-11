import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
  companies: [],
  loading: false
};

export const addCompany = createAsyncThunk('companies/add', async (company) => {
  const response = await axios.post('/companies/add-company', company);

  return response.data;
});
export const getAllCompanies = createAsyncThunk('companies/getAllCompanies', async () => {
  const response = await axios.get('/companies/get-companies');

  return response.data;
});
export const updateMerchant = createAsyncThunk('companies/updateMerchant', async (body) => {
  const response = await axios.put('/companies/update-company', body);

  return response.data;
});
export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies = action.payload.companies;
      state.loading = false;
    });
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.companies = action.payload.companies;
      state.loading = false;
    });
    builder.addCase(updateMerchant.fulfilled, (state, action) => {
      state.companies = action.payload.companies;
      state.loading = false;
    });
  }
});

export default companiesSlice.reducer;
