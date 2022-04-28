import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";
import { Button, CircularProgress } from "@mui/material";

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

export const SessionPage = () => {
  const [sessionData] = useState(
    JSON.parse(window.sessionStorage.getItem("sessionData"))
  );
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([
    sessionData.participantId,
  ]);

  const chats = React.useRef([]);
  const forceUpdate = useForceUpdate();
  const setChats = (newChats) => {
    chats.current = newChats;
    forceUpdate();
  };

  const [viewOnlyChat, setViewOnlyChat] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const loadChatBox = () => {
    if (!socket || !chats.current) {
      return <CircularProgress color="secondary"></CircularProgress>;
    } else
      return (
        <ChatBoxContainer>
          <ChatBox
            chats={
              viewOnlyChat ? [...chats.current, viewOnlyChat] : chats.current
            }
            setChats={setChats}
            sendMessage={sendMessage}
            setCurrentSelection={setCurrentSelection}
            value={value}
            setValue={setValue}
          />
        </ChatBoxContainer>
      );
  };

  useEffect(() => {
    window.onpopstate = () =>
      window.sessionStorage.setItem("sessionData", null);
  }, []);

  useEffect(() => {
    if (!sessionData) return;

    // establish socket connection
    const newSocket = io.connect("http://localhost:5000", {
      transports: ["websocket"],
    });
    newSocket.emit("joinRoom", {
      sessionId: sessionData.sessionId,
      participantId: sessionData.participantId,
      sessionCode: sessionData.sessionCode,
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [sessionData]);

  useEffect(() => {
    if (!socket) return;
    socket.on("updateParticipants", ({ participants }) =>
      setParticipants(participants)
    );
    socket.on("createdChat", (chat) => {
      const newChat = {
        ...chat,
        members: chat.members.sort((memberA, memberB) => {
          if (memberA.id < memberB.id) return -1;
          if (memberB.id < memberA.id) return 1;
          return 0;
        }),
      };
      setValue(chats.current.length);
      setChats([...chats.current, newChat]);
      setViewOnlyChat(null);
    });
    socket.on("updateChats", ({ chats }) => {
      setChats(
        chats.map((chat) => ({
          ...chat,
          members: chat.members.sort((memberA, memberB) => {
            if (memberA.id < memberB.id) return -1;
            if (memberB.id < memberA.id) return 1;
            return 0;
          }),
        }))
      );
      if (chats) setValue(0);
    });
    socket.on("updatedChat", ({ updateType, updateData, id }) => {
      const newChats = chats.current.map((chat) => {
        const newChat = { ...chat };
        if (chat.id === id) {
          newChat.content = chat.content.concat(updateData);
        }
        return newChat;
      });
      setChats(newChats);
    });
  }, [socket]);

  useEffect(() => {
    if (currentSelection.length === 1) {
      setValue(chats.current.length - 1);
      setViewOnlyChat(null);
      return;
    }
    let chatI = -1;
    const sortedSelection = [...currentSelection].sort().join(",");
    chats.current.forEach((chat, i) => {
      if (chat.members.map((member) => member.id).join(",") === sortedSelection)
        chatI = i;
    });
    if (chatI !== -1) {
      setValue(chatI);
      setViewOnlyChat(null);
    } else {
      setValue(chats.current.length);
      setViewOnlyChat({
        members: participants
          .filter((participant) => currentSelection.includes(participant._id))
          .map((participant) => ({
            name: participant.name,
            id: participant._id,
          })),
        sessionId: sessionData.sessionId,
        id: -1,
        content: [],
      });
    }
  }, [currentSelection]);

  const createChat = () => {
    socket.emit("createChat", {
      members: currentSelection,
      sessionId: sessionData.sessionId,
    });
  };

  const sendMessage = (chatId, message) => {
    const messageData = {
      senderName: sessionStorage.getItem("current_username"),
      senderId: sessionData.participantId,
      message: message,
    };
    if (chatId === -1) {
      socket.emit("createChat", {
        members: currentSelection,
        sessionId: sessionData.sessionId,
        initialContent: messageData,
      });
    } else {
      socket.emit("updateChat", {
        updateType: "messageSent",
        id: chatId,
        updateData: messageData,
      });
    }
  };

  const selectCard = (participantId) => {
    if (
      currentSelection.includes(participantId) &&
      participantId !== sessionData.participantId
    )
      setCurrentSelection(
        currentSelection.filter((pid) => pid !== participantId)
      );
    else if (participantId !== sessionData.participantId)
      setCurrentSelection(currentSelection.concat(participantId));
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
        </CardsContainer>
        {loadChatBox()}
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
