import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();
    if(content) {
        dispatch(addPost(content, userData.id))
        .then(() => dispatch(getPosts()))
        .then(() => setContent(''));
    }
  };

  const cancelPost = () => {
    setContent("");
  };

  return (
    <div className="post-container">
          <div className="post-form">
            <textarea
              name="content"
              id="content"
              placeholder="Ecrire un nouvel article"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className="footer-form">
              <div className="btn-send">
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default NewPostForm;
