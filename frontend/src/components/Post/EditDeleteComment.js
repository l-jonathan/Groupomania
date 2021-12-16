///////////////////////////////////////////////////////////
//////////// PAGE POST - EDIT & DELETE COMMENT ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment, deleteComment } from "../../actions/comments.actions";

// Function to delete the post
const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);

  const handleEdit = (e) => {
    e.preventDefault();

    if (content) {
      dispatch(editComment(comment.id, content));
      setContent("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(comment.id));

  useEffect(() => {
    // Verify that the post belongs to the user
    const checkAuthor = () => {
      if (userData.id === comment.UserId) setIsAuthor(true);
    };
    checkAuthor();
  }, [userData.id, comment.UserId]);

  return (
    <div className="edit-comment">
      {((isAuthor && edit === false) || userData.isAdmin === true) && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {((isAuthor && edit) || (edit && userData.isAdmin === true)) && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={comment.content}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (
                  window.confirm(
                    "Voulez-vous vraiment supprimer ce commentaire ?"
                  )
                ) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
