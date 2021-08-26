import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";

export const SessionPage = ({ sessionData }) => {
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!sessionData) return;

    const newSocket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });

    newSocket.emit("joinRoom", {
      sessionId: sessionData.sessionId,
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [sessionData]);

  useEffect(() => {
    socket &&
      socket.on("updateParticipants", ({ participants }) =>
        setParticipants(participants)
      );
  }, [socket]);

  const getParticipantCards = () =>
    participants.map((participant, i) => (
      <CardContainer key={i}>
        <ParticipantCard label={participant.name} />
      </CardContainer>
    ));

  if (!sessionData) return null;

  return (
    <Container>
      <Banner>
        <BannerText>{"Users: " + participants.length}</BannerText>
        <BannerText style={{ fontSize: "2rem", lineHeight: "2rem" }}>
          Welcome to WeChat
        </BannerText>
        <BannerText>{"Room Code: " + sessionData.sessionCode}</BannerText>
      </Banner>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CardsContainer>{getParticipantCards()}</CardsContainer>
        <ChatBox></ChatBox>
      </div>
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
