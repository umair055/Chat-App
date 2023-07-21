import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../../utils/APIRoutes";
import { Buffer } from "buffer";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) toast.error("Please select an avatar");
    else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      await axios
        .post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        })
        .then((data) => {
          console.log(data);
          if (data.data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.data.image;
            localStorage.setItem("chat-app-user", JSON.stringify(user));
            navigate("/");
          } else {
            toast.error("Error setting avatar. Please try again later.");
          }
        });
    }
  };
  console.log(selectedAvatar);

  useEffect(() => {
    const getAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=31pPMOSmhneAXb
          `
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getAvatars();
  }, []);
  return (
    <>
      <ToastContainer position="top-center" />
      {isLoading ? (
        <Container>
          <h1>Avatars Loading</h1>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                onClick={() => setSelectedAvatar(index)}
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  className="avatarImage"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            className="SetProfilePicButton"
            onClick={() => setProfilePicture()}
          >
            Set as Profile Picture
          </button>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;

  background: #131324;
  height: 100vh;
  width: 100vw;
  .avatarImage {
    height: 6rem;
  }
  .loader {
    max-inline-size: 100%;
  }
  .title-container h1 {
    color: white;
    text-align: center;
  }

  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .avatars .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
  }

  .SetProfilePicButton {
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
  .avatars .selected {
    border: 0.4rem solid #4e0eff;
  }
`;

export default SetAvatar;
