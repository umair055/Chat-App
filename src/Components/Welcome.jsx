import React from "react";
import styled from "styled-components";
const Welcome = ({ user }) => {
  return (
    <Container>
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
  color: white;
  span {
    color: #4e0eff;
  }
`;
export default Welcome;
