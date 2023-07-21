import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password, confirmpassword } = RegisterData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        navigate("/login");
      }
    }
  };
  const handleValidation = () => {
    const { email, username, password, confirmpassword } = RegisterData;
    if (password === "" || email === "" || username === "") {
      toast.error("Fill All Fields!!!");
      return false;
    } else if (password !== confirmpassword) {
      toast.error("Passwords Don't Match!!!");
      return false;
    } else if (password.length < 8) {
      toast.error("Passwords Should Be Greater Than 8 Characters!!!");
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer position="top-center" />
      <FromContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Chit Chat</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Conirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button className="SignUpButton" type="submit">
            Sign Up
          </button>
          <span>
            Already Have Account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FromContainer>
    </>
  );
};
const FromContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background: #131324;

  .brand h1 {
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    @media only screen and (max-width: 480px) {
      padding: 3rem 2rem;
      background: none;
    }
    input {
      background: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
      }
    }
    .SignUpButton {
      background: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transfrom: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
export default Register;
