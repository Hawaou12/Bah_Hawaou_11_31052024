// src/pages/SignIn.js
import From from "../../containers/Form/form";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="div">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <From />
        </section>
      </main>
    </div>
  );
};

export default SignIn;