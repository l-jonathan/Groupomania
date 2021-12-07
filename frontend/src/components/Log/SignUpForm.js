import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";
    passwordError.innerHTML = "";

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password !== controlPassword || passwordRegex.test(password) === false || emailRegex.test(email) === false) {
      if (emailRegex.test(email) === false) {
        emailError.innerHTML = "L'email est incorrect";
      }
      if (passwordRegex.test(password) === false) {
        passwordError.innerHTML = "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial";
      }
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
      }
    } else {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        withCredentials: true,
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            firstNameError.innerHTML = res.data.errors.firstName;
            lastNameError.innerHTML = res.data.errors.lastName;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form action="" onSubmit={handleSignUp} id="sign-up-form">
      <label htmlFor="firstName">Prénom</label>
      <br />
      <input
        type="text"
        name="firstname"
        id="firstname"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <div className="firstName error"></div>
      <br />
      <label htmlFor="lastName">Nom</label>
      <br />
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <div className="lastName error"></div>
      <br />
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
      <label htmlFor="password-conf">Confirmer votre mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className="password-confirm error"></div>
      <br />
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUpForm;
