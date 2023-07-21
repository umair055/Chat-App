import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { sendMessageRoute, getMessageRoute } from "../utils/APIRoutes";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleReducer } from "../Redux/toggleContacts";
const ChatContainer = ({ currentChat, user, socket }) => {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState([]);
  const [arrivedMessage, setArrivedMessage] = useState();
  const scrollRef = useRef();
  useEffect(() => {
    const getAllMessages = async () => {
      if (currentChat) {
        const response = await axios.post(getMessageRoute, {
          from: user._id,
          to: currentChat._id,
        });
        setAllMessages(response.data);
      }
    };
    getAllMessages();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      message: msg,
    });
    const msgs = [...allMessages];
    msgs.push({ fromSelf: true, message: msg });
    setAllMessages(msgs);
  };

  useEffect(() => {
    if (socket.current)
      socket.current.on("msg-receive", (msg) =>
        setArrivedMessage({ fromSelf: false, message: msg })
      );
  }, []);

  useEffect(() => {
    arrivedMessage && setAllMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [allMessages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-detail">
          <FiMenu onClick={() => dispatch(toggleReducer(true))} />
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {allMessages.map((message, index) => (
          <div ref={scrollRef} key={uuidv4}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};
const Container = styled.div`
  padding-top: 1rem;
 height:85vh;
 position:relative;
  flex-direction:column;
  @media only screen and (max-width: 600px) {
    height:100vh !important;
    width:100vw;
}
  .chat-header {
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    @media only screen and (max-width: 600px){
      padding:0 0.5rem;
    }
    .user-detail {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      svg{
        display:none;
        color:white
      }
      @media only screen and (max-width: 600px){
        svg{
          display:block;
        }
      }
      .avatar {
      
        img {
          height: 3rem;
        }
        @media only screen and (max-width: 600px){
          img{
            height:2.3rem;
          }
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    overflow: auto;
    max-height:80%;
    @media only screen and (max-width: 600px){
      padding:1rem 1rem;
    }
    .message {
      display: flex;
      align-items: center;
    
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media only screen and (max-width: 600px){
          font-size:0.8rem;
          padding:0.7rem;
          margin-bottom:0.3rem;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background: #9900ff20;
      }
  }
 
`;
export default ChatContainer;
