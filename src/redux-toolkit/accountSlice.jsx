import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUser = createAsyncThunk(
  "account/login",
  async (credentials) => {
    const response = await fetch(`${backendUrl}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true', 
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const { email, token, message } = data;
    localStorage.setItem("token", token);
    return {email,message};
  }
);

export const registerUser = createAsyncThunk(
  "account/register",
  async (userData) => {
    const response = await fetch(`${backendUrl}/user/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true', 
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // This should be the user data
  }
);

// Add logout action
export const logoutUser = createAsyncThunk("account/logout", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${backendUrl}/user/logout/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      'ngrok-skip-browser-warning': 'true', 
    },
    body: JSON.stringify(),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  localStorage.removeItem("token");
  return null; // or handle the logout response data
});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        console.log("userLogin", state.user);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("actionPayload:-", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload.data;
        console.log("userRegister", state.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {

        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export default accountSlice.reducer;
