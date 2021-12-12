import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, dateParser } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  //const userData = useSelector((state) => state.userReducer);
  const commentsData = useSelector((state) => state.commentReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.UserId) return user.profilePhoto;
                  })
                  .join("")
              }
              alt="profilePhoto"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user.id === post.UserId)
                        return user.firstName + " " + user.lastName;
                    })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.content}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>
                {!isEmpty(commentsData[0]) &&
                    usersData.map((comment) => {
                      if (comment.PostId === post.id)
                        return comment.id;
                    })}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
