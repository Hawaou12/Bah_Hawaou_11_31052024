import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, body } from "../../helpers/features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "./sign.css";

const Sing = () => {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const user = useSelector(selectUser); // Récupère l'état utilisateur depuis Redux
  const dispatch = useDispatch(); // Hook pour dispatcher les actions Redux
  const infos = useSelector(body); // Récupère les informations utilisateur stockées dans Redux
  const userName = infos.payload?.user?.body?.body?.userName; // Nom d'utilisateur extrait des informations

  // Fonction pour gérer la déconnexion de l'utilisateur
  function Singout() {
    localStorage.removeItem("token"); // Supprime le token de l'utilisateur
    navigate("/"); // Redirige vers la page d'accueil
    dispatch(logout()); // Déclenche l'action Redux pour effacer les informations utilisateur
  }

  // Fonction pour rediriger vers la page de connexion
  function Singin() {
    navigate("/login");
  }

  // Si l'utilisateur n'est pas connecté, supprime le token
  if (!user) {
    localStorage.removeItem("token");
  }

  // Rend le bouton de connexion ou de déconnexion en fonction de l'état utilisateur
  return !user ? (
    <div>
      <button onClick={Singin} className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        Sign In
      </button>
    </div>
  ) : (
    <div className="logout">
      {/* Lien vers le profil utilisateur */}
      <Link className="NameUser" to="/profile">
        <i className="fa fa-user-circle"></i>
        <p className="user name">{userName}</p>
      </Link>
      {/* Bouton de déconnexion */}
      <button onClick={Singout} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
        Sign out
      </button>
    </div>
  );
};

export default Sing;
