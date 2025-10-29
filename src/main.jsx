import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home/Home.jsx";
import NewTodo from "./views/NewTodo/NewTodo.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/new" element={<NewTodo/>}></Route>
    </Routes>
  </BrowserRouter>
);
  