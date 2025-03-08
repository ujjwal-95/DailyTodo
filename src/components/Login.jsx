import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if fields are empty
    if (!email.trim() || !password.trim()) {
      setError({
        email: !email.trim(),
        password: !password.trim(),
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("authUser", email);
      navigate("/todo");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <Paper elevation={3} className="login-box">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email}
          helperText={error.email ? "Email is required" : ""}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.password}
          helperText={error.password ? "Password is required" : ""}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className="login-btn"
        >
          Login
        </Button>
        <Typography align="center" className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
