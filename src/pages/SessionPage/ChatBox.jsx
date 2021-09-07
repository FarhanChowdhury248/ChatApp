import React from "react";
import { Tabs, Tab, Container, TextField, IconButton } from "@material-ui/core";
import { MdSend } from "react-icons/md";
import styled from "styled-components";

export const ChatBox = ({ participantId, socket, chatId }) => {
  const [value, setValue] = React.useState(1);
  const [message, setMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    console.log(value);
    setValue(newValue);
  };

  const handleMessageChange = (newValue) => {
    setMessage(newValue.target.value);
    console.log(message.toString());
  };

  const sendMessage = () => {
    setChatMessages([...chatMessages, { sender: window.sessionStorage.getItem("current_username"), message: message}])
    console.log("chatId is " + chatId);
    if (socket && chatId) {
      socket.emit("updateChat", {
        updateType: "messageSent",
        id: chatId,
        updateData: {
          content: { sender: participantId, message: message },
        },
      });
    }
    setMessage("");
    console.log("after sending");
    console.log(chatMessages);
  };

  function Messages() {
    return chatMessages.map((chatMessage) => {
      return <text
      style={{
        fontSize: "11pt",
        marginBottom: "0.5rem",
        color: "rgba(0, 0, 0, 0.65)",
        overflowWrap: "break-word",
      }}>
      <b style={{overflowWrap: "break-word"}}>{chatMessage.sender}:</b> {chatMessage.message}
    </text>
    })
  }

  // const singleMessage = (content) => {
  //     return (
  //     <div>
  //         <text>
  //             {content}
  //         </text>
  //     </div>
  //     );
  // }
  function TypingMessage(props) {
    if (props.isTyping) {
      return (
        <text
          style={{
            fontSize: "11pt",
            fontStyle: "italic",
            marginBottom: "0.5rem",
            color: "rgba(0, 0, 0, 0.65)",
          }}
        >
          {window.sessionStorage.getItem("current_username")} is typing...
        </text>
      );
    } else return <div></div>;
  }

  return (
    <ChatContainer>
      <Container fixed maxWidth="lg">
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
            <Tab style={{ fontSize: "1.4rem" }} label="Chat 2" value={2} />
          </Tabs>
        </TopLayer>
        <Container
          fullWidth
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            backgroundColor: "#e2e2e2",
            height: "75rem",
          }}
        >
          <TypingMessage isTyping={message !== ""} />
          <div style={{display: "flex",
            flexDirection: "column",
             width: "initial", maxHeight: "75rem", overflowY: "auto"}}><Messages></Messages></div>
        </Container>
        <BottomLayer>
          <TextField
            value={message}
            onChange={handleMessageChange}
            id="standard-basic"
            placeholder="Write a message..."
            size="large"
            fullWidth
            inputProps={{ style: { fontSize: 16 } }}
            style={{
              paddingTop: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              backgroundColor: "white",
              borderBottomLeftRadius: "25px",
              borderBottomRightRadius: "25px",
              height: "5rem",
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={sendMessage}>
                  <MdSend fontSize="large"></MdSend>
                </IconButton>
              ),
            }}
          />
        </BottomLayer>
      </Container>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  float: right;
  height: 90%;
  width: 40%;
  margin-left: auto;
  margin-top: 2.5rem;
`;

const TopLayer = styled.div`
  height: 15%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  z-index: 1000;
`;

const MainChatBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 500;
  background-color: grey;
`;

const BottomLayer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: white;
`;
