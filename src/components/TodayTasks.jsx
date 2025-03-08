import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Checkbox } from "@mui/material";
import "./TodayTasks.css";

const TodayTasks = ({ todos, saveTodos }) => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-CA"); // Formats as YYYY-MM-DD
  };

  const [today, setToday] = useState(getTodayDate());

  useEffect(() => {
    // Check date change every minute
    const interval = setInterval(() => {
      const newDate = getTodayDate();
      if (newDate !== today) {
        setToday(newDate);
      }
    }, 60000); // Runs every minute

    return () => clearInterval(interval);
  }, [today]);

  // Filter tasks for the current day
  const todayTasks = todos.filter((todo) => todo.date === today);

  return (
    <div className="today-tasks-container">
      <Typography variant="h4" className="section-title">
        Today's Tasks ({today})
      </Typography>

      <ul className="task-list">
        {todayTasks.length > 0 ? (
          todayTasks.map((todo) => (
            <Card key={todo.id} className={`task-card ${todo.completed ? "completed-task" : ""}`}>
              <CardContent className="task-content">
                <Checkbox
                  color="primary"
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
                  {todo.task} <strong>({todo.priority})</strong> <em>{todo.date}</em>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" className="no-tasks">No tasks for today.</Typography>
        )}
      </ul>
    </div>
  );
};

export default TodayTasks;

