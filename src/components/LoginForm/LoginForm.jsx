import React, { useState } from "react";
import "./LoginForm.css";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { googleSignIn, logIn } from "../../firebase/auth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
      setLoading(true);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

  const handleLoginEmailandPassword = async (e) => {
    e.preventDefault();
    await logIn(email, password);
    navigate("/");
  };

  return (
  <div className="login">
      <div className="login-form">
        <h1 className="login-form-title">Login Now</h1>
        <div className="login-form-input">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="login-form-text"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="login-form-text"
            type="password"
            placeholder="Password"
          />
          <div className="login-btn" onClick={handleLoginEmailandPassword}>
            Login
          </div>
  
          <p>
            I don't have account. Please{" "}
            <Link to="/signup">create an account</Link>
          </p>
  
          <div style={{ textAlign:'center' }}>
            <span>Or</span>
          </div>
        </div>
  
        <div className="login-form-social">
          <button
            className={`login-form-button login-form-google ${
              loading ? "disableButton" : ""
            }`}
            onClick={handleLoginGoogle}
          >
            <span>Login with Google</span>
          </button>
          <button
            className={`login-form-button login-form-facebook ${
              loading ? "disableButton" : ""
            }`}
            disabled={loading}
          >
            <span>Login with Facebook</span>
          </button>
        </div>
      </div>
  </div>
  );
};

export default LoginForm;
