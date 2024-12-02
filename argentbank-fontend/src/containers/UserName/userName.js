import "./userName.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { body } from "../../helpers/features/userSlice";
import UserEdit from "../UserEdit/userEdit";

// Récupération du token utilisateur depuis le localStorage
let token = localStorage.getItem("token");

// Appel à l'API pour récupérer le profil utilisateur
let response = await fetch("http://localhost:3001/api/v1/user/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête pour l'authentification
    Accept: "application/json",
  },
});

console.log("Response from profile API:", response); // Débogage pour vérifier la réponse de l'API

const NameUser = () => {
  // Récupération des informations utilisateur depuis le state Redux
  const infos = useSelector(body);
  console.log("Redux state (infos):", infos); // Débogage pour voir le contenu du state
  console.log("Extracted email:", infos?.payload?.user?.user?.user?.email); // Extraction de l'email utilisateur depuis le state

  // Définir le nom d'utilisateur par défaut depuis les données du state
  let userNameDefault = infos?.payload?.user?.user?.user?.email;
  console.log("Default username:", userNameDefault); // Vérification du nom d'utilisateur par défaut

  // Gestion de l'état pour savoir si la fenêtre de modification est ouverte
  const [open, setOpen] = useState(false);

  // Fonction pour ouvrir le formulaire de modification du nom d'utilisateur
  const edit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du clic
    setOpen(true); // Ouvre le formulaire de modification
  };

  return open ? (
    // Si la fenêtre de modification est ouverte, affiche le composant `UserEdit`
    <UserEdit closeModal={setOpen} />
  ) : (
    // Sinon, affiche le nom d'utilisateur et le bouton de modification
    <div className="header">
      <h1>
        Welcome back
        <br />
        {`${userNameDefault}  ! `}
      </h1>
      {/* Bouton pour ouvrir le formulaire de modification */}
      <button onClick={edit} className="edit-button">
        Edit Name
      </button>
    </div>
  );
};

export default NameUser;
