import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";
import { Button } from "@material-ui/core";

export const SessionPage = ({ sessionData }) => {
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [chats, setChats] = React.useState([]);

  useEffect(() => {
    if (!sessionData) return;
    const newSocket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });
    newSocket.emit("joinRoom", {
      sessionId: sessionData.sessionId,
      participantId: sessionData.participantId,
    });
    // TODO: implement creation and update of main chat
    // newSocket.emit("createChat", {
    //   members: [sessionData.participantId],
    //   sessionId: sessionData.sessionId,
    // });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [sessionData]);

  useEffect(() => {
    if (!socket) return;
    socket.on("updateParticipants", ({ participants }) =>
      setParticipants(participants)
    );
    socket.on("createdChat", ({ members, sessionId, id, content }) => {
      console.log([...chats, { members, sessionId, id, content }]);
      setChats([...chats, { members, sessionId, id, content }]);
    });
  }, [socket, chats]);

  const createChat = () => {
    console.log("creating");
    socket.emit("createChat", {
      members: currentSelection,
      sessionId: sessionData.sessionId,
    });
    setCurrentSelection([]);
  };

  const selectCard = (participantId) => {
    if (currentSelection.includes(participantId))
      setCurrentSelection(
        currentSelection.filter((pid) => pid !== participantId)
      );
    else setCurrentSelection(currentSelection.concat(participantId));
  };

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <CardsContainer>
          <div style={{ display: "flex", flexGrow: 1 }}>
            {participants.map((participant, i) => (
              <CardContainer
                onClick={() => selectCard(participant._id)}
                key={i}
              >
                <ParticipantCard
                  label={participant.name}
                  isSelected={currentSelection.includes(participant._id)}
                />
              </CardContainer>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={currentSelection.length < 2}
              onClick={createChat}
              style={{
                backgroundColor:
                  currentSelection.length < 2 ? "#A1A1A1" : "#EF5DF1",
                fontSize: "2rem",
                width: "100%",
              }}
            >
              Create Chat
            </Button>
          </div>
        </CardsContainer>
        <ChatBoxContainer>
          <ChatBox chats={chats} />
        </ChatBoxContainer>
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
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  flex-wrap: wrap;
  float: left;
  width: 50%;
  padding-right: 1rem;
`;

const CardContainer = styled.div`
  margin: 1rem;
  height: fit-content;
`;

const ChatBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 50%;
  flex-direction: column;
  flex-direction: column;
  align-content: center;
  padding-left: 1rem;
`;
