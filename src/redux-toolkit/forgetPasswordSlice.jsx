import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Define the initial state
const initialState = {
  email: "",
  otp: "",
  new_password: "",
  re_new_password: "",
  isLoading: false,
  otpSent: false,
  timer: 60,
  timerOn: false,
  error: null,
};

// Async thunk for sending OTP
export const sendOTP = createAsyncThunk(
  "forgetPassword/sendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://foodie-git-main-vikas8236s-projects.vercel.app/user/password-reset/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true', 
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for resending OTP
export const resendOTP = createAsyncThunk(
  "forgetPassword/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://foodie-git-main-vikas8236s-projects.vercel.app/user/password-reset/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true', 
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
  
// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "forgetPassword/resetPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://foodie-git-main-vikas8236s-projects.vercel.app/user/password-reset-confirm/",
        values,
        {
          headers: {
            "Content-Type": "application/json",
           'ngrok-skip-browser-warning': 'true', 
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setTimerOn: (state, action) => {
      state.timerOn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.otpSent = true;
          toast.success("OTP sent successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
          toast.error(action.payload?.message || "Failed to send OTP", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
          toast.success("OTP Resent Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
          toast.error(action.payload?.message || "Failed to resend OTP", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Password changed successfully");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Invalid OTP or other error");
      });
  },
});

// Export actions
export const { setTimer, setTimerOn } = forgetPasswordSlice.actions;

// Export the reducer
export default forgetPasswordSlice.reducer;
