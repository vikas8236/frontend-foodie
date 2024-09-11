import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Async thunk action to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        `${backendUrl}/user/add-to-cart/`,
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Token ${token}`,
            'ngrok-skip-browser-warning': 'true', 
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to fetch the current cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get(`${backendUrl}/user/cart/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true', 
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      await axios.delete(`${backendUrl}/user/cart/${productId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true', 
        },
      });

      return productId; // Return the itemId directly
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to clear the cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      // Make DELETE request to clear cart
      await axios.delete(`${backendUrl}/user/cart/delete_all/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true', 
        },
      });

      return; // No need to return data since the state is managed asynchronously
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice with initial state and reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = []; // Clear all items from cart
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
