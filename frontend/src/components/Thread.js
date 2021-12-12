import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch])

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;



/*import React from 'react';

import axios from 'axios';

import Card from "./Post/Card";
import { isEmpty } from "./Utils";

export default class PostsList extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/api/post/`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  render() {
    return (
        <div className="thread-container">
            <ul>
            {!isEmpty(this.state.posts[0]) &&
          this.state.posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
            
            </ul>
        </div>
    )
  }
}*/


//{ this.state.posts.map(post => <li key={post.id}>{post.content}</li>)}