///////////////////////////////////////////////////////////
////////////         PAGE POST - LIKES         ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLike } from "../../actions/like.actions";

// Function to like/unlike the post
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const likeData = useSelector((state) => state.likeReducer);
  const dispatch = useDispatch();

  // Function to like the post
  const like = () => {
    dispatch(getLike(post.id, userData.id));
    setLiked(true);
  };

  // Function to dislike the post
  const unlike = () => {
    dispatch(getLike(post.id, userData.id));
    setLiked(false);
  };

  useEffect(() => {
    for (var i = 0; i < likeData.length; i++) {
      if (
        likeData[i].UserId === userData.id &&
        likeData[i].PostId === post.id
      ) {
        return setLiked(true);
      } else return setLiked(false);
    }
  }, [userData.id, likeData, post.id, liked]);

  // Display the heart empty or filled
  return (
    <div className="like-container">
      {liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
    </div>
  );
};

export default LikeButton;
