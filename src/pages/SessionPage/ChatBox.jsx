import React from "react";
import { Tabs, Tab, Container, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { MdSend } from "react-icons/md"
import styled from "styled-components";

export const ChatBox = ({socket, chatId}) => {

    const [value, setValue] = React.useState(1);
    const [message, setMessage] = React.useState("");
    // const [chatMessages, setChatMessages] = React.useState([]);

    function handleTabChange(event, newValue) {
        console.log(value);
        setValue(newValue);
    };

    function handleMessageChange(newValue) {
        setMessage(newValue.target.value)
        console.log(message.toString());
    };

    function sendMessage() {
        //setChatMessages([...chatMessages, message])
        console.log("chatId is " + chatId);
        if (socket) {
            socket.emit("updateChat", { updateType: "messageSent", id: chatId, updateData: {
                content: ["hey"]//[...chatMessages, message]
            } })
        }
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
                <text style={{fontSize: "11pt", fontStyle: "italic", marginBottom: "0.5rem", color: "rgba(0, 0, 0, 0.65)" }}>{window.sessionStorage.getItem("current_username")} is typing...</text>
            )
        }

        else return <div></div>
    }

    return (
        <ChatContainer>
            <Container fixed maxWidth="lg">
                <TopLayer>
                        <Tabs fullWidth centered indicatorColor="primary" value={value} onChange={handleTabChange} style={{ backgroundColor: "white", borderTopLeftRadius: "25px", 
                            borderTopRightRadius: "25px" }}>
                            <Tab style={{ fontSize: "1.4rem" }} label="Chat 1" value={1} />
                            <Tab style={{ fontSize: "1.4rem" }} label="Chat 2" value={2} />
                        </Tabs>
                </TopLayer>
                <Container fullWidth fixed style={{ display: "flex", flexDirection: "column-reverse", marginRight: "25rem", backgroundColor: "#e2e2e2", height: "75rem" }}>
                    <TypingMessage isTyping={message !== ""} />
                </Container>
                <BottomLayer>
                    <TextField value={message} onChange={handleMessageChange} id="standard-basic" placeholder="Write a message..." size="large" fullWidth inputProps={{style: {fontSize: 16}}} 
          style={{ paddingTop: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem",
          backgroundColor: "white", borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px", height: "5rem" }} InputProps={{
            endAdornment: <IconButton onClick={sendMessage()}>
            <MdSend fontSize="large"></MdSend>
        </IconButton>}} />
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
    width: 50%;
    margin-left: 50rem;
    margin-top: 2.5rem;
`;

const TopLayer = styled.div`
    height: 15%;
    border-top-left-radius: 25%:
    border-top-right-radius: 25%:
    zIndex: 1000,
`;  

const MainChatBox = styled.div`
    display:flex;
    flex-direction: column;
    position: absolute:
    right: 500;
    background-color: grey;
`;

const BottomLayer = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom-left-radius: 25%:
    border-bottom-right-radius: 25%:
    backgroundColor: white;
`;
