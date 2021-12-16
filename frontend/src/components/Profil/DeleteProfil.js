///////////////////////////////////////////////////////////
////////////       PAGE PROFIL - DELETE        ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProfil } from "../../actions/user.actions";

// Function to delete the profil
const DeleteProfil = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deleteProfil(props.id));

  // Display the form to delete the user
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer votre profil ?")) {
          deleteQuote();
        }
      }}
    >
      <button>Supprimer votre compte</button>
    </div>
  );
};

export default DeleteProfil;
