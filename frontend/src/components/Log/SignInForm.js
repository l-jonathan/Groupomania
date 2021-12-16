////////////////////////////////////////////////////////////
////////////           PAGE FOR SIGNIN          ////////////
////////////////////////////////////////////////////////////

// Import dependencies
import React, { useState } from "react";
import axios from "axios";

// Function to signin
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    // Request to signin
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // Verify if mail and password is correct
        if (res.data.messageMail || res.data.messagePass) {
          if (!res.data.messagePass)
            emailError.innerHTML = res.data.messageMail;
          if (!res.data.messageMail) {
            emailError.innerHTML = "";
            passwordError.innerHTML = res.data.messagePass;
          }
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        return err;
      });
  };

  // Display signin form
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">E-mail</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
