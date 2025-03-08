import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import "./AddTaskForm.css";

const AddTaskForm = ({ todos, saveTodos }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");

  const addTodo = () => {
    if (!task.trim() || !date) {
      alert("Please fill in all fields before adding a task.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      alert("You cannot select a past date.");
      return;
    }

    const newTodos = [
      ...todos,
      { id: Date.now(), task, priority, date, completed: false },
    ];
    saveTodos(newTodos);

    // Clear form fields after adding a task
    setTask("");
    setPriority("Medium");
    setDate("");
  };

  return (
    <div className="task-form">
      <h2 className="heading">Add Your Today's Target</h2>
      <TextField
        variant="outlined"
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        inputProps={{ min: new Date().toISOString().split("T")[0] }} // Disable past dates
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
        fullWidth
        margin="normal"
      >
        <MenuItem value="High">🔥 Necessary</MenuItem>
        <MenuItem value="Medium">⚡ Important </MenuItem>
        <MenuItem value="Low">✅ Less Important</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={addTodo} fullWidth>
        Add Task
      </Button>
    </div>
  );
};

export default AddTaskForm;
