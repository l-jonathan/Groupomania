import React from "react";
import { useDispatch } from 'react-redux';
import { deleteProfil } from '../../actions/user.actions'

const DeleteProfil = (props) => {
    const dispatch = useDispatch();
    const deleteQuote = () => dispatch(deleteProfil(props.id))

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