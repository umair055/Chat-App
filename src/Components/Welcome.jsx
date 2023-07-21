import React from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleReducer } from "../Redux/toggleContacts";
const Welcome = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <FiMenu onClick={() => dispatch(toggleReducer(true))} />
      <h1>
        Welcome, <span>{user?.username}</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0.3rem 0 0 0.3rem;
    display: none;
  }
  @media only screen and (max-width: 600px) {
    width: 100vw;
    svg {
      display: block;
    }
  }
  color: white;

  span {
    color: #4e0eff;
  }
`;
export default Welcome;
