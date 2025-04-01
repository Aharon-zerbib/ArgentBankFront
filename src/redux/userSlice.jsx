import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userCredentials
      );
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Échec de la connexion");
    }
  }
);

// Action pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { getState, rejectWithValue }) => {
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
      return rejectWithValue(error.response?.data || "Échec de la mise à jour du profil");
    }
  }
);

// Action pour récupérer le profil de l'utilisateur
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de la récupération du profil");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
 
    user: null,
    userName: null,
    token: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.userName = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.body.token;
        state.userName = action.payload.body.userName;
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
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
