import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, selectBody } from "../../helpers/features/userSlice";
import { useNavigate, Link } from "react-router-dom";

import "./sign.css";

const Sign = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const infos = useSelector(selectBody);  // Utiliser le sélecteur mémoïsé
  const userName = infos?.payload?.user?.body?.userName;

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/");
    dispatch(logout());
  }

  function handleSignIn() {
    navigate("/login");
  }

  if (!user) {
    localStorage.removeItem("token");
  }

  return !user ? (
    <div>
      <button onClick={handleSignIn} className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        Sign In
      </button>
    </div>
  ) : (
    <div className="logout">
      <Link className="nameUser" to="/profile">
        <i className="fa fa-user-circle"></i>
        <p className="user-name">{userName}</p>
      </Link>
      <button onClick={handleSignOut} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
        Sign out
      </button>
    </div>
  );
};

export default Sign;
