import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h2 className="notFound-title">404 - Page non trouvée</h2>
      <p className="notFound-p">
        Oups! La page que <span>vous demandez n'existe pas.</span>
      </p>
      <Link to="/" className="notFound-link">
        Retourner sur la page d'accueil
      </Link>
    </div>
  );
};

export default NotFound;
