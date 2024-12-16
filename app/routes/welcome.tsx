import React from "react";
import { NavLink } from "react-router";

const Welcome: React.FC = () => {
  return (
    <div>
      <h1>Welcome to React Router 7 with React 19!</h1>
      <NavLink to="/home">Go to Home</NavLink>
    </div>
  );
};

export default Welcome;
