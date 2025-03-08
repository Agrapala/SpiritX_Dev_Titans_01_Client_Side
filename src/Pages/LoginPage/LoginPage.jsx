import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import PopupMessage from "../../Components/PopupMessage/popupMessage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ type: "", message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setPopup({ type: "error", message: "Invalid Username or Password" });
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:8080/api/v1/signin", {
        username,
        password,
      });
      
      if (response.status === 200) {
        setPopup({ type: "success", message: "Login Successful!" });
      }
    } catch (error) {
      setPopup({ type: "error", message: "Invalid Username or Password" });
    }

    // Automatically clear the popup message after 3 seconds
    setTimeout(() => {
      setPopup({ type: "", message: "" });
    }, 2000);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <div>
          <label className="login-label">Username</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        <p className="login-link">
          Don't have an account? <Link to="/SignUpPage">Sign up here</Link>
        </p>
      </form>

      {/* Render PopupMessage with the appropriate type and message */}
      <PopupMessage type={popup.type} message={popup.message} />
    </div>
  );
}

export default LoginPage;
