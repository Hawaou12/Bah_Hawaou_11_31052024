import { createSlice, createSelector } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    body: null, // Inclure body dans l'état initial
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.body = null; // Réinitialisation de body lors de la déconnexion
    },
    body: (state, action) => {
      state.body = action.payload; // Mettre à jour body
    },
  },
});

export const { login, logout, body } = userSlice.actions;
export const selectUser = (state) => state.user.user;

// Modification de `selectBody` pour éviter l'erreur
export const selectBody = createSelector(
  (state) => state.user.body,
  (body) => ({ ...body }) // Crée une nouvelle référence pour éviter les re-rendus inutiles
);

export default userSlice.reducer;
