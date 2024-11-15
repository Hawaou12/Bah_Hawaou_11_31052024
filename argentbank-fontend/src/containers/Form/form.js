import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, body } from "../../helpers/features/userSlice";
import "./form.css";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);
      return () => clearTimeout(timer);
    }
    if (errorUser) {
      const timer = setTimeout(() => setErrorUser(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, errorUser]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      return;
    }

    const credentials = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.status === 200) {
        localStorage.setItem("token", result.body.token);
        dispatch(login({ user: credentials }));
        navigate("/profile");

        const token = result.body.token;
        const profileResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const profile = await profileResponse.json();
        if (profile.status === 200) {
          dispatch(body({ body: profile.body }));
        }
      } else {
        setErrorUser(true);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorUser(true);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {error && <p className="error">Error: Email and password cannot be null or empty</p>}
      {errorUser && <p className="error">Error in username or password</p>}
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
};

export default Form;
