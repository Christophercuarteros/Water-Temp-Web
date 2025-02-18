import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSignup} className="form">
          <label>Email:</label>
          <input type="text" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm password" required />

          <div className="links">
            <Link to="/">Back to Login</Link>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
