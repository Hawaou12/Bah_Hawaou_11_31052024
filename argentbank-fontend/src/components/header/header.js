import { Link } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";
import Sign from "../sign/sign";
import "./header.css";
 
const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <Sign />
    </nav>
  );
};

export default Header;