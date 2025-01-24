import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, body } from "../../helpers/features/userSlice";
import "./form.css";

const From = () => {
  // États locaux pour gérer les champs email et mot de passe, ainsi que les erreurs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState(false); // Indique si les identifiants sont incorrects
  const [error, setError] = useState(false); // Indique si les champs sont vides
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fonction pour gérer la soumission du formulaire
  async function log(e) {
    e.preventDefault();

    // Vérifie si les champs sont vides
    if (email.length === 0 || password.length === 0) {
      setError(true);
      // Réinitialise l'erreur après 30 secondes
      setTimeout(() => {
        setError(false);
      }, 30000);
      return;
    }

    // Prépare les données de connexion
    let item = { email, password };

    // Effectue la requête pour se connecter
    let result = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    console.log(result)

    // Si la connexion est réussie
    if (result.status === 200) {
      navigate("/profile"); // Redirige vers la page profil
      localStorage.setItem("token", result.body.token); // Stocke le token dans le localStorage

      // Met à jour l'état Redux avec les informations de connexion
      dispatch(
        login({
          user: item,
        })
      );

      // Requête pour récupérer les informations de l'utilisateur
      let token = localStorage.getItem("token");
      let response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      const profile = await response.json();

      // Si les informations sont récupérées avec succès
      if (profile.status === 200) {
        // Met à jour l'état Redux avec les données utilisateur
        dispatch(
          body({
            body: profile.body,
          })
        );
      }
    } else {
      // Si la connexion échoue, affiche une erreur et réinitialise les champs
      setErrorUser(true);
      setEmail("");
      setPassword("");

      // Réinitialise l'erreur après 3 secondes
      setTimeout(() => {
        setErrorUser(false);
      }, 3000);
    }
  }

  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Met à jour l'état `email`
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Met à jour l'état `password`
          type="password"
          id="password"
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {error && (
        <p className="error">Error: Email and password cannot be null or empty</p>
      )}
      {errorUser && !error && (
        <p className="error">Error in username or password</p>
      )}
      <button type="submit" className="sign-in-button" onClick={log}>
        Sign In
      </button>
    </form>
  );
};

export default From;
