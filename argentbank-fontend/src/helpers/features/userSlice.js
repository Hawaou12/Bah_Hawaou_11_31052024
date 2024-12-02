import { createSlice } from "@reduxjs/toolkit";

// Création du slice Redux pour gérer l'état utilisateur
export const userSlice = createSlice({
  name: "user", // Nom du slice

  // État initial du slice
  initialState: {
    user: null, // Stocke les informations de l'utilisateur connecté
  },

  // Définitions des actions et des reducers associés
  reducers: {
    // Action pour connecter un utilisateur
    login: (state, action) => {
      state.user = action.payload; // Met à jour l'état utilisateur avec les données passées dans l'action
    },

    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.user = null; // Réinitialise les données utilisateur
      state.body = null; // Réinitialise les données supplémentaires liées à l'utilisateur
    },

    // Action pour mettre à jour des données spécifiques de l'utilisateur
    body: (state, action) => {
      state.body = action.payload; // Met à jour l'état avec les données supplémentaires passées dans l'action
    },
  },
});

// Export des actions définies dans les reducers
export const { login, logout } = userSlice.actions; // Actions pour connecter et déconnecter un utilisateur
export const { body } = userSlice.actions; // Action pour mettre à jour les données supplémentaires de l'utilisateur

// Sélecteur pour récupérer les données utilisateur
export const selectUser = (state) => state.user.user;

// Export du reducer pour l'intégrer dans le store Redux
export default userSlice.reducer;
