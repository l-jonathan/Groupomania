import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      {uid ? (
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/home">
              <div className="logo">
                <img
                  src="./img/icon-left-font-monochrome-black.svg"
                  alt="icon"
                />
              </div>
            </NavLink>
          </div>
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {userData.firstName}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        </div>
      ) : (
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/">
              <div className="logo">
                <img
                  src="./img/icon-left-font-monochrome-black.svg"
                  alt="icon"
                />
              </div>
            </NavLink>
          </div>
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/*import React from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

export default class ActualUser extends React.Component {
  state = {
    actualUser: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/api/auth/actualUser`).then((res) => {
      const actualUser = res.data;
      console.log("actualUser NavBar: "+actualUser);
      this.setState({ actualUser });
    });
  }

  render() {
    return (
      <nav>
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/">
              <div className="logo">
                <img
                  src="./img/icon-left-font-monochrome-black.svg"
                  alt="icon"
                />
              </div>
            </NavLink>
          </div>
          <ul>
            <li></li>
            <li className="logo">
              coucou
              {this.state.actualUser.map((user) => (
                <li key={user.id}>{user.firstName}</li>
              ))}
              <NavLink exact to="/profil">
                <img src="./img/icon-profil.png" alt="login" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}*/
