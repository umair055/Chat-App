import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Chat from "./Components/Pages/Chat";
import SetAvatar from "./Components/Pages/SetAvatar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
