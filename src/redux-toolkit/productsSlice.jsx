import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true', 
};

export const productsData = createAsyncThunk("productsData", async () => {
  const response = await fetch(`${backendUrl}/products/products/`,{ headers },
    // {
    // method: "GET",
    // headers: {
    //   'Content-Type': 'application/json',
    //   'ngrok-skip-browser-warning': 'true', 
    // },
  // }
  );
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error state on pending
      })
      .addCase(productsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(productsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
