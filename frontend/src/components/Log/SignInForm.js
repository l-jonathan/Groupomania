import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersData = useSelector((state) => state.usersReducer);

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    

     /*(
      !usersData[].email.includes(email) ||
      !usersData.password.includes(password)
    ) {
      if (!usersData.email.includes(email)) {
        emailError.innerHTML = "L'email est inconnu";
      }
      if (!usersData.password.includes(password)) {
        passwordError.innerHTML = "Le mot de passe est incorrect";
      }
    } else {*/
      
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
          if (res.data.messageMail || res.data.messagePass) {
            if (!res.data.messagePass)
            emailError.innerHTML = res.data.messageMail;
            if(!res.data.messageMail) {
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
