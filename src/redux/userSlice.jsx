import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// creation Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userCredentials
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// creation updateUserProfile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { getState, rejectWithValue }) => {
     //getState recupere state
     //rejectWithValue renvoye erreur
    const { token } = getState().user;
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName: userData.userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profile update failed");
    }
  }
);

// creation userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    token: null,
    error: null,
  },
  //reducers definiactions
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
  //extraReducers gere actions asynchrones
  extraReducers: (builder) => {
    builder
    //addCase gere l'action
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.body.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
