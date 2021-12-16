////////////////////////////////////////////////////////////
////////////            APPLICATION             ////////////
////////////////////////////////////////////////////////////

// Import dependencies
import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

// Creation of the application
const App = () => {
  const [id, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      // Verification of the user token
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (id) dispatch(getUser(id));
  }, [id, dispatch]);

  return (
    <UidContext.Provider value={id}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
