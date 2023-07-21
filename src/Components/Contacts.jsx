import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toggleReducer } from "../Redux/toggleContacts";

const Contacts = ({ allContacts, currentUser, changeChat }) => {
  const dispatch = useDispatch();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const Toggle = useSelector((state) => state.toggle.toggle);
  return (
    <>
      {currentUserImage && currentUserName && Toggle && (
        <Container>
          <div className="brand">
            <h3>Chit Chat</h3>
            <ImCross onClick={() => dispatch(toggleReducer(false))} />
          </div>
          <div className="contacts">
            {allContacts.map(
              (contact, index) =>
                contact.avatarImage && (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatarImage"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="current-user">
            {" "}
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                alt="avatarImage"
              />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  overflow: hidden;
  height: 85vh;
  grid-template-rows: 10% 75% 15%;
  background: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    svg {
      color: white;
      display: none;
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    .contact {
      background: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background: #9186f3;
    }
  }
  .current-user {
    background: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media-screen and(min-width::720px) and(max-width:1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    position: absolute !important;
    left: 0;
    height: 100vh;
    width: 60vw;
    z-index: 2;
    .brand {
      justify-content: space-around;
      svg {
        display: block;
      }
    }
    .current-user {
      gap: 1.5rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
    .contacts .contact {
      min-height: 4rem;
      gap: 1rem;
    }
  }
`;
export default Contacts;
