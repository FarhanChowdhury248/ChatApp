import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, TextField, IconButton } from '@material-ui/core';
import { MdSend } from "react-icons/md"
import styled from "styled-components";

export const ChatBox = () => {

    // const singleMessage = (content) => {
    //     return (
    //     <div>
    //         <text>
    //             {content}
    //         </text>
    //     </div>
    //     );
    // }
    
    let val = "Chat 1"

    return (
        <ChatContainer>
            <Container fixed maxWidth="lg">
                <TopLayer>
                    <Tabs centered value={val} style={{ backgroundColor: "white", borderTopLeftRadius: "25px", 
                        borderTopRightRadius: "25px", width: "85rem" }}>
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 1" />
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 2" />
                    </Tabs>
                </TopLayer>
                <Container fixed style={{ marginRight: "25rem", backgroundColor: "#e2e2e2", height: "75rem", width: "85rem" }}>
                    
                </Container>
                <BottomLayer>
                    <TextField InputProps={{
            endAdornment: <IconButton>
            <MdSend fontSize="large"></MdSend>
        </IconButton>,
          }} id="standard-basic" placeholder="Write a message..." size="large" fullWidth inputProps={{style: {fontSize: 16}}} style={{ paddingTop: "0.5rem", paddingLeft: "1rem", paddingRight: "6rem", backgroundColor: "white", borderBottomLeftRadius: "25px", 
                    borderBottomRightRadius: "25px", height: "5rem" }} />
                    
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
`;  

const MainChatBox = styled.div`
    display:flex;
    flex-direction: column;
    position: absolute:
    right: 500;
    background-color: grey;
`;

const BottomLayer = styled.div`
    border-bottom-left-radius: 25%:
    border-bottom-right-radius: 25%:
    backgroundColor: white;
`;
