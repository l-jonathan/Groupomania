///////////////////////////////////////////////////////////
////////////          ROUTER - INDEX           ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

// creation of application paths
const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Profil" exact component={Profil} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
