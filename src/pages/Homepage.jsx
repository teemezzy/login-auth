import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="new-user">
      <h1>HomePage</h1>

      <h2>
        <Link to="/login">Login</Link>
      </h2>
      <h2>
        <Link to="/newuser">New User</Link>
      </h2>
    </div>
  );
};

export default Homepage;
