import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";

export const SessionPage = ({ sessionData }) => {
  const [value, setValue] = React.useState(1);
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [chatId, setChatId] = useState("");

  const handleTabChange = (event, newValue) => {
    console.log(value);
    setValue(newValue);
  };

  useEffect(() => {
    if (!sessionData) return;

    const newSocket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });
 
    // console.log(sessionData);

    newSocket.emit("joinRoom", {
      sessionId: sessionData.sessionId,
      participantId: sessionData.participantId,
    });

    newSocket.emit("createChat", {
      members: [sessionData.participantId],
      sessionId: sessionData.sessionId,
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [sessionData]);

  useEffect(() => {
    if (!socket) return;
    socket.on("updateParticipants", ({ participants }) =>
      setParticipants(participants)
    );
    socket.on("createdChat", ({ members, sessionId, id, content }) => {
      setChatId(id);
    });
  }, [socket]);

  const cardSelected = (participantId) => {
    if ((currentSelection.length != 0) && (currentSelection.includes(participantId))) currentSelection.splice(currentSelection.indexOf(participantId), 1);
    else setCurrentSelection(currentSelection.push(participantId));
    console.log(currentSelection);
  }

  const createTabs = (names) => {
    if (currentSelection.length != 0) {
      return <Tab style={{ fontSize: "1.4rem" }} label={currentSelection.toString()} value={99} />
    }

    else return <span></span>
  }

  const getParticipantCards = () =>
    participants.map((participant, i) => (
      <CardContainer onClick={() => cardSelected(participant._id)} key={i}>
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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <CardsContainer style={{ width: "50%", float: "left" }}>
          {getParticipantCards()}
        </CardsContainer>
        {
          <div style={{display: "flex", flexDirection: "column", width: "40%", float: "right", marginTop: "1rem" }}>
          <TopLayer>
          <Tabs
            fullWidth
            centered
            indicatorColor="primary"
            value={value}
            onChange={handleTabChange}
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
            }}
          >
            <Tab style={{ fontSize: "1.4rem" }} label="Chat 1" value={1} />
            {createTabs()}
          </Tabs>
        </TopLayer>
          <ChatBox
            participantId={sessionData.participantId}
            socket={socket}
            chatId={chatId}
          ></ChatBox>
          </div>
        }
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

const TopLayer = styled.div`
  height: 15%;
  float: right;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;