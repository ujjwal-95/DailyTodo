import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "./Navbar";
import TodayTasks from "./TodayTasks";
import AllTasks from "./AllTasks";
import AddTaskForm from "./AddTaskForm";
import "./TodoApp.css";

const TodoApp = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);

  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos-${user.uid}`);
      setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    }
  }, [user]);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem(`todos-${user.uid}`, JSON.stringify(updatedTodos));
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="todo-container">
      <Navbar setShowForm={setShowForm} setShowAllTasks={setShowAllTasks} handleLogout={handleLogout} />
      <div className="content">
        {showForm ? <AddTaskForm todos={todos} saveTodos={saveTodos} setShowForm={setShowForm} /> : showAllTasks ? <AllTasks todos={todos} saveTodos={saveTodos} /> : <TodayTasks todos={todos} saveTodos={saveTodos} />}
      </div>
    </div>
  );
};
export default TodoApp;