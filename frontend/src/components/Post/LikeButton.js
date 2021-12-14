import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLike } from "../../actions/like.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer);
 // const postData = useSelector((state) => state.postReducer);
  const likeData = useSelector((state) => state.likeReducer);
  const dispatch = useDispatch();
  
  const like = () => {
    dispatch(getLike(post.id, userData.id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(getLike(post.id, userData.id));
    setLiked(false);
  };

  /*useEffect(() => {
    console.log("like userId: "+likeData.includes(userData.id));
    if (likeData.includes(userData.id)) setLiked(true);
    else setLiked(false);
  }, [userData.id, likeData, liked]);*/

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
