import React, { useState } from "react";
import styled from "styled-components";
import UserImage from "../../assets/images/profilePic.png";
import { BsFillPersonFill } from "react-icons/bs";

function CurrentUserCard(props) {
  const currentUser = window.sessionStorage.getItem("current_username") === props.username;
  if (currentUser) {
    return <IconContainer>
      <BsFillPersonFill size={15}></BsFillPersonFill>
    </IconContainer>
  }
  return null;
}

export const ParticipantCard = ({ label }) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickCard = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true)
  }

  return (
    <Container onClick={clickCard}>
      <ImageContainer>
        <img src={UserImage} alt="Profile" />
      </ImageContainer>
      <LabelContainer  style={isClicked ? {backgroundColor: "#EF5DF1"} : {backgroundColor: "white"}}>
        <CurrentUserCard username={label} />
        <Label>{label}</Label>
      </LabelContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 18rem;
`;

const IconContainer = styled.div`
  margin-top: 0.9rem;
  margin-right: 1rem;
`;

const ImageContainer = styled.div`
  background: #dedddd;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  border-radius: 1rem 1rem 0px 0px;
  border: 0.1rem solid #777777;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border: 0.1rem solid #777777;
  border-top: none;
  box-sizing: border-box;
  border-radius: 0px 0px 1rem 1rem;
  padding: 1rem;
`;

const Label = styled.p`
  font-size: 2rem;
  margin: 0;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
`;
