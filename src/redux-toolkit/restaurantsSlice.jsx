// restaurantsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const restaurantsData = createAsyncThunk("restaurantsData", async () => {
  const response = await fetch(`${backendUrl}/restaurants/restaurants/`, {
    headers:  {'ngrok-skip-browser-warning': 'true'}
  });
  const data = await response.json();
  return data;
});

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(restaurantsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error state on pending
      })
      .addCase(restaurantsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.restaurants = action.payload;
      })
      .addCase(restaurantsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectRestaurants = (state) => state.restaurants;

export default restaurantsSlice.reducer;
