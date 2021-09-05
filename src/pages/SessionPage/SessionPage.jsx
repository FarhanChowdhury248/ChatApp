import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";
import { wait, waitFor } from "@testing-library/dom";

export const SessionPage = ({ sessionData }) => {
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    console.log("ue1");
    if (!sessionData) return;

    const newSocket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });

    // console.log(sessionData);

    newSocket.emit("joinRoom", {
      sessionId: sessionData.sessionId,
      participantId: sessionData.participantId,
    });

    console.log("about to create chat....e");
    newSocket.emit("createChat", {
      members: [sessionData.participantId],
      sessionId: sessionData.sessionId,
    })

    console.log("socket created chat....e");

    setSocket(newSocket);

    console.log("hello");

    return () => newSocket.disconnect();
  }, [sessionData]);

  useEffect(() => {
    console.log("ue2");
    if (!socket) return;
      socket.on("updateParticipants", ({ participants }) =>
        setParticipants(participants)
      );
      socket.on("createdChat", ({ members, sessionId, id, content }) => {
        console.log("received chatId " + id);
        setChatId(id);
      })
  }, [socket]);

  const getParticipantCards = () =>
    participants.map((participant, i) => (
      <CardContainer key={i}>
        <ParticipantCard label={participant.name} />
      </CardContainer>
    ));

  //if (!sessionData) return null;
  // const createChatBox = () => {
    
  //     if (socket) {
  //       return <ChatBox socket={socket} chatId={chatId}></ChatBox>
  //     }

  //     else return null;
  // }

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
        <CardsContainer style={{ width: "50%" }}>{getParticipantCards()}</CardsContainer>
        {<ChatBox socket={socket} chatId={chatId}></ChatBox>}
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
