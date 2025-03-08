import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoApp from "./components/TodoList";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to /todo after login */}
        <Route path="/" element={user ? <Navigate to="/todo" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={user ? <TodoApp /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
