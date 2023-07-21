import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const handleEmojoPickerVisibility = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const onEmojiClick = (e, emoji) => {
    console.log("object");
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
    console.log(e.emoji);
  };
  const handleChat = (event) => {
    event.preventDefault();

    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={() => handleEmojoPickerVisibility()} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emojiObject) =>
                setMessage((prevMsg) => prevMsg + emojiObject.emoji)
              }
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => handleChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 0;
  align-items: center;
  background: #080420;
  padding: 0 1rem;
  @media only screen and (max-width: 600px) {
    padding: 0 0.5rem;
  }
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -370px;
        z-index: 1;
        height: 22rem !important;
        width: 30vw !important;
        @media only screen and (max-width: 600px) {
          width: 50vw !important;
        }
        @media only screen and (max-width: 400px) {
          width: 75vw !important;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff34;
    input {
      width: 80%;
      height: 60%;
      background: transparent;
      border: none;
      color: white;
      padding-left: 1rem;
      font-size: 1.2rem;
      &&::selection {
        backgorund: #9186f3;
      }
      &: focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      align-item: center;
      justify-content: center;
      background: #9186f3;
      border: none;
      @media only screen and (max-width: 600px) {
        padding: 0.3rem 1rem;
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
