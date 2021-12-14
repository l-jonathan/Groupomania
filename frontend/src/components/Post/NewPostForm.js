import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../Utils";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fa fa-spinner fa-pulse"></i>
      ) : (
        <>
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
                {content ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
