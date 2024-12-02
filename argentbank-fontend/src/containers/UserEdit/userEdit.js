import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body } from "../../helpers/features/userSlice";
import "./userEdit.css";

const EditUser = ({ closeModal }) => {
  // Extraction des informations utilisateur depuis le store Redux
  const infos = useSelector(body);

  // Récupération des valeurs par défaut pour les champs utilisateur
  let userNameDefault = infos.payload?.user?.body?.body?.userName;
  let firstName = infos.payload?.user?.body?.body?.firstName;
  let lastName = infos.payload?.user?.body?.body?.lastName;

  // État local pour le champ du nom d'utilisateur
  const [userName, setUserName] = useState(userNameDefault);

  // Récupération du token utilisateur depuis le localStorage
  let token = localStorage.getItem("token");

  // Initialisation du dispatch pour mettre à jour le store Redux
  const dispatch = useDispatch();

  // Fonction pour gérer la mise à jour des informations utilisateur
  async function Update(e) {
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission du formulaire

    // Envoi de la requête PUT à l'API pour modifier le nom d'utilisateur
    let editName = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Définition du format des données envoyées
        Authorization: `Bearer ${token}`, // Ajout du token pour authentification
        Accept: "application/json",
      },
      body: JSON.stringify({ userName: userName }), // Envoi du nouveau nom d'utilisateur
    });

    // Conversion de la réponse en JSON
    editName = await editName.json();

    // Vérifie si la mise à jour a réussi
    if (editName.status === 200) {
      // Mise à jour du store Redux avec les nouvelles informations utilisateur
      dispatch(
        body({
          body: editName.body,
        })
      );
    }

    // Ferme la modal après la mise à jour
    closeModal(false);
  }

  return (
    <div className="editUser">
      <h2 className="title">Edit User info</h2>
      <form>
        {/* Champ pour modifier le nom d'utilisateur */}
        <div className="inputuser">
          <label>User name:</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Met à jour l'état local à chaque modification
          />
        </div>

        {/* Champ affichant le prénom (lecture seule) */}
        <div className="inputuser">
          <label>First name: </label>
          <input value={firstName} readOnly />
        </div>

        {/* Champ affichant le nom (lecture seule) */}
        <div className="inputuser">
          <label>Last name:</label>
          <input value={lastName} readOnly />
        </div>

        {/* Boutons pour sauvegarder ou annuler les modifications */}
        <div className="btn">
          <button className="sign-in-button" onClick={Update}>
            Save
          </button>
          <button className="sign-in-button" onClick={() => closeModal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
