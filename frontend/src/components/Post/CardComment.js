import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, dateParser } from "../Utils";
import { addComment } from "../../actions/comments.actions";
import { getComments } from "../../actions/comments.actions";
import EditDeleteComment from "./EditDeleteComment";

const CardComment = ({ post }) => {
  const [content, setContent] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  //const postData = useSelector((state) => state.postReducer);
  const commentData = useSelector((state) => state.commentsReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if(content) {
        dispatch(addComment(post.id, content, userData.id))
        .then(() => dispatch(getComments()))
        .then(() => setContent(''));
    }
  };

  return (
    <div className="comments-container">
      {commentData.map((comment) => {
        if (comment.PostId === post.id) {
          return (
            <div
              className={
                comment.UserId === userData.id
                  ? "comment-container client"
                  : "comment-container"
              }
              key={comment.id}
            >
              <div className="left-part">
                <img
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === comment.UserId)
                          return user.profilePhoto;
                        else return null;
                      })
                      .join("")
                  }
                  alt="profilePhoto"
                />
              </div>
              <div className="right-part">
                <div className="comment-header">
                    <div className="pseudo">
                        <h3>
                    {usersData.map((user) => {
                      if (comment.UserId === user.id) {
                        return user.firstName + ' ' + user.lastName;
                      } else return null;
                    })}
                  </h3>
                    </div>
                  <span>{dateParser(comment.updatedAt)}</span>
                </div>
                <p>{comment.content}</p>
                <EditDeleteComment comment={comment} postId={post.id} />
              </div>
            </div>
          );
        } else return null;
      })}
      <form action="" onSubmit={handleComment} className="comment-form">
          <input type="text" name="text" onChange={(e) => setContent(e.target.value)} value={content} placeholder="Laisser un commentaire" />
          <br/>
          <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CardComment;
