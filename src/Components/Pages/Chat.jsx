import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import Contacts from "../Contacts";
import Welcome from "../Welcome";
import ChatContainer from "../ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [allContacts, setallContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setallContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getUsers();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          allContacts={allContacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome user={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            user={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #131324;
  .container {
    margin: auto;
    height: 85vh;
    width: 85vw;
    background: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media-screen and(min-width::720px) and(max-width:1080px) {
      grid-template: 35% 65%;
    }
  }
  @media only screen and (max-width: 600px) {
    .container {
      width: 100vw;
      height: 100vh;
    }
  }
`;
export default Chat;
