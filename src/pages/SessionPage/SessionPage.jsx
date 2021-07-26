import React from "react";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";

export const SessionPage = ({ sessionData }) => {
  console.log(sessionData);

  const getParticipantCards = () => {
    const cards = [];
    for (let i = 0; i < 20; i++)
      cards.push(
        <CardContainer key={i}>
          <ParticipantCard label={"Fisstech " + i} />
        </CardContainer>
      );
    return cards;
  };

  return (
    <Container>
      <Banner>
        <BannerText>Users: 4</BannerText>
        <BannerText style={{ fontSize: "2rem", lineHeight: "2rem" }}>
          Welcome to WeChat
        </BannerText>
        <BannerText>Room Code: XG9F2L</BannerText>
      </Banner>
      <CardsContainer>{getParticipantCards()}</CardsContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(90deg, #09d3df 0%, #ec0dfc 100%);
  padding: 1rem;
`;

const Banner = styled.div`
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

const BannerText = styled.p`
  margin: 1rem;
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: #797979;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 5rem);
  overflow-y: scroll;
`;

const CardContainer = styled.div`
  margin: 1rem;
`;
