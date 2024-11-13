import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const URL = config.BASE_URL;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    // const request = await axios.post(`${URL}/admin/login`, userCredentials);
    // const response = request.data.payload;

    // Store token in localStorage
    // localStorage.setItem("token", response.token);

    // return response;

    if (process.env.NODE_ENV === "development") {
      // Simulate a successful response in development mode
      const dummyResponse = {
        token: "dummy_token_12345",
        user: {
          id: "dummy_user_id",
          name: "Dummy User",
          email: "dummyuser@example.com",
        },
      };

      // Store dummy token in localStorage
      localStorage.setItem("token", dummyResponse.token);

      return dummyResponse;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload; // Store user details in state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Invalid Credentials";
      });
  },
});

export default userSlice.reducer;
