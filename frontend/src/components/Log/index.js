////////////////////////////////////////////////////////////
////////////       PAGE INDEX FOR REGISTER      ////////////
////////////////////////////////////////////////////////////

// Import dependencies
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

// Form to select signin or signup
const Log = () => {
  const [signInModal, setSignInModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      // Form signup
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      // Form signin
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
