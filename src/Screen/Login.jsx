import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "1234") {
      localStorage.setItem("user", email); // Store user info (optional)
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>WELCOME</h2>
        <p>WATER TEMP.</p>
        <div className="content">
          <div className="left">
            <img src="/b.png" alt="Logo" className="logo" />
          </div>
          <div className="divider"></div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="links">
                <Link to="#">Forgot Password?</Link>
                <Link to="/signup">Create Account</Link>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
