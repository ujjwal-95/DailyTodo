import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Check if fields are empty
    if (!email.trim() || !password.trim()) {
      setError({
        email: !email.trim(),
        password: !password.trim(),
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await auth.signOut();
  
      alert("Registration successful! Please log in.");
      setEmail(""); 
      setPassword(""); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <Paper elevation={3} className="register-box">
        <Typography variant="h4" align="center" gutterBottom>
          Register
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
          onClick={handleRegister}
          className="register-btn"
        >
          Register
        </Button>
        <Typography align="center" className="login-link">
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
