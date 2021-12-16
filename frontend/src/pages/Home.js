//////////////////////////////////////////////////////////
////////////             HOME PAGE            ////////////
//////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";

// Display the homepage
const Home = () => {
  return (
    <div className="home">
      <div className="main">
        <div>
          <div className="home-header">
            <NewPostForm />
          </div>
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
