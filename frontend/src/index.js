///////////////////////////////////////////////////////////
////////////       INDEX OF APPLICATION        ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
import { getComments } from "./actions/comments.actions";
import { readLike } from "./actions/like.actions";

// Dev tools
import { composeWithDevTools } from "redux-devtools-extension";

// Creation of the store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getComments());
store.dispatch(readLike());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
