import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { BiPowerOff } from "react-icons/bi";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };
  return (
    <Button onClick={() => handleLogout()}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
  }
`;
export default Logout;
