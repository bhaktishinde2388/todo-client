import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./NewTodo.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function NewTodo() {
  const [todoData, setTodoData] = useState({
    todoItem: "",
    priority: "low",
    emoji: "🔎",
  });

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);


   const API_URL = import.meta.env.VITE_API_URL;

  const addTodo = async () => {
    try {
      // Use the same backend base URL as Home so newly added todos show up
      const response = await axios.post(
        `${API_URL}/todos`,
        todoData
      );

      if (response) {
        toast.success(response.data.message);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error("Add todo failed:", error);
      const msg =
        error?.response?.data?.message || error?.message || "Failed to add!!";
      toast.error(msg);
    }
  };

  return (
    <div>
      <div className="new-todo-form">
        <p className="heading">Create Plan</p>
        <input
          type="text"
          className="input-box"
          value={todoData.todoItem}
          onChange={(e) => {
            setTodoData({
              ...todoData,
              todoItem: e.target.value,
            });
          }}
        />

        <select
          value={todoData.priority}
          className="select-box"
          onChange={(e) => {
            setTodoData({
              ...todoData,
              priority: e.target.value,
            });
          }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <span
          className="emoji-box"
          onClick={() => {
            setEmojiPickerOpen(!emojiPickerOpen);
          }}
        >
          Emoji: {todoData.emoji}
        </span>

        <EmojiPicker
          onEmojiClick={({ emoji }) => {
            setTodoData({
              ...todoData,
              emoji: emoji,
            });
            setEmojiPickerOpen(false);
          }}
          open={emojiPickerOpen}
        />

        <button onClick={addTodo} className="add-btn">
          Add Task
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default NewTodo;