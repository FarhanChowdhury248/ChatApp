import React from "react";
import { Tabs, Tab, IconButton } from "@mui/material";
import { MdSend } from "react-icons/md";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { useEffect } from "react";

export const ChatBox = ({
  chats,
  setChats,
  socket,
  sessionInfo,
  setCurrentSelection,
  value,
  setValue,
}) => {
  const handleChange = (event, newValue) => {
    setCurrentSelection(chats[newValue].members.map((member) => member.id));
    setValue(newValue);
  };
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (!socket || !chats) return;
    socket.on("updatedChat", ({ updateType, updateData, id }) => {
      const newChats = chats.map((chat) => {
        const newChat = { ...chat };
        if (chat.id === id) {
          newChat.content = chat.content.concat(updateData);
        }
        return newChat;
      });
      setChats(newChats);
    });
  }, [socket, chats]);

  const sendMessage = (chatId) => {
    socket.emit("updateChat", {
      updateType: "messageSent",
      id: chatId,
      updateData: {
        senderName: sessionStorage.getItem("current_username"),
        senderId: sessionInfo.participantId,
        message: message,
      },
    });
  };

  if (!chats || chats.length === 0 || !chats[value])
    return (
      <div
        style={{
          backgroundColor: "#e2e2e2",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "3.3rem",
        }}
      >
        <p
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "2.8rem",
            color: "#626262",
          }}
        >
          No Chats Created
        </p>
      </div>
    );

  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        style={{
          backgroundColor: "#FFF",
          width: "100%",
          borderRadius: "33px 33px 0px 0px",
        }}
      >
        {chats.map((chat, i) => (
          <Tab
            key={i}
            style={{
              fontSize: "2rem",
              color: "#5B5B5B",
              fontStyle: chat.id === -1 ? "italic" : "normal",
            }}
            label={chat.members.map((member) => member.name).join(", ")}
          />
        ))}
      </Tabs>
      <MessagesContainer>
        {chats[value].content.map((msg, i) => (
          <Message key={i} sender={msg.senderName} text={msg.message} />
        ))}
      </MessagesContainer>
      <MessageBox>
        <div style={{ flexGrow: 1, paddingRight: "1.2rem" }}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Write a message"}
            InputProps={{
              style: {
                fontSize: "2rem",
                color: "black",
              },
            }}
          />
        </div>
        <IconButton
          onClick={() => {
            sendMessage(chats[value].id);
            setMessage("");
          }}
        >
          <MdSend color={message ? "#EC0DFC" : ""} fontSize="large" />
        </IconButton>
      </MessageBox>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  height: 100%;
  background-color: #e2e2e2;
  padding: 3rem;
  padding-bottom: 1.5rem; // regular padding - bottom padding of MessageContainer
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: flex-start;
`;

const MessageBox = styled.div`
  background-color: #fff;
  display: flex;
  padding: 2.5rem;
  border-radius: 0px 0px 33px 33px;
`;

const Message = ({ sender, text }) => (
  <MessageContainer>
    <SenderTypography>{sender}:</SenderTypography>
    <TextTypography>{text}</TextTypography>
  </MessageContainer>
);

const MessageContainer = styled.div`
  margin: 0 0 1.5rem 0;
  display: flex;
`;

const SenderTypography = styled.p`
  margin: 0;
  margin-right: 1rem;
  font-weight: bold;
  font-size: 2rem;
  color: #626262;
`;

const TextTypography = styled.p`
  margin: 0;
  margin-right: 1rem;
  font-size: 2rem;
  color: #626262;
`;
