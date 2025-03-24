import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Création requet pour connexion de utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userCredentials
      );
      //stockage de données dans le local storage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      //retourne erreur si requête échoue
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Création du slice pour la gestion de utilisateur
const userSlice = createSlice({
  name: "user",
  //état initial du slice
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      //suppression de données dans local storage
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  //gestion des actions
  extraReducers: (builder) => {
    builder
      //quant action est en cours
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //quand action est réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      //quand action échoue
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

// rajouter le PUT pour modifier les données de l'utilisateur
