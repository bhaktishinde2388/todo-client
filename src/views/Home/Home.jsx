import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router";
import DelIcon from "../../assets/DeleteIcon.png";
import toast, { Toaster } from 'react-hot-toast'


function Home() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const response = await axios.get("https://todo-server-r9c1.onrender.com/todos");
    setTodos(response.data.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`https://todo-server-r9c1.onrender.com/todos/${id}`);
  
      if (response) {
        toast.success(response.data.message);
        loadTodos();
      }
    } catch (error) {
      toast.error("Failed to delete!!")
    }
  };

  return (
    <div>
      <h1 className="heading">PlanWise – smart planning made simple.</h1>

      {todos.map((todoObj) => {
        const { id, todoItem, emoji, priority, isDone, createdAt } = todoObj;
        return (
          <div key={id} className="todo-card">
            <span className="todo-priority">{priority}</span>
            <div className="todo-icon">{emoji}</div>
            <div className={`todo-detail ${isDone ? "todo-done" : ""}`}>
              <h2>{todoItem}</h2>
            </div>
            <span className="todo-created-at">
              {createdAt.replace("T", " ").slice(0, 16)}
            </span>

            <img
              src={DelIcon}
              className="del-icon"
              onClick={() => {
                deleteTodo(id);
              }}
            />
          </div>
        );
      })}

      <Link to="/new" className="fab">
        Add New
      </Link>
      <Toaster/>
    </div>
  );
}

export default Home;