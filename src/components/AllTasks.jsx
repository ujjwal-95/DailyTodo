import React from "react";
import { Typography, Card, CardContent, Checkbox, Button } from "@mui/material";
import "./AllTask.css";

const AllTasks = ({ todos, saveTodos }) => {
  const deleteTodo = (id) => saveTodos(todos.filter((todo) => todo.id !== id));

  
  const sortedTodos = [...todos].sort((a, b) => new Date(b.date) - new Date(a.date));

  
  const groupedTodos = sortedTodos.reduce((acc, todo) => {
    if (!acc[todo.date]) acc[todo.date] = [];
    acc[todo.date].push(todo);
    return acc;
  }, {});

  return (
    <div className="all-tasks-container">
      <Typography variant="h4" className="section-title">
        All Tasks
      </Typography>
      
      {Object.keys(groupedTodos).map((date) => (
        <div key={date} className="task-group">
          <Typography variant="h5" className="task-date">{date}</Typography>
          <ul className="task-list">
            {groupedTodos[date].map((todo) => (
              <Card key={todo.id} className={`task-card ${todo.completed ? "completed-task" : ""}`}>
                <CardContent className="task-content">
                  <Checkbox
                    color={todo.completed ? "success" : "primary"}
                    checked={todo.completed}
                    onChange={() =>
                      saveTodos(
                        todos.map((t) =>
                          t.id === todo.id ? { ...t, completed: !t.completed } : t
                        )
                      )
                    }
                  />
                  <Typography variant="body1" className="task-text">
                    {todo.task} <strong>({todo.priority})</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ❌ Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;


