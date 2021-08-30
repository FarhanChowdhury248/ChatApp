import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, TextField } from '@material-ui/core';
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
                    <Tabs value={val} style={{ backgroundColor: "white", borderTopLeftRadius: "25px", 
                        borderTopRightRadius: "25px", width: "100rem" }}>
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 1" />
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 2" />
                    </Tabs>
                </TopLayer>
                <MainChatBox>
                    <Container fixed style={{ backgroundColor: "#e2e2e2", height: "75rem", width: "100rem" }}>
                        
                    </Container>
                </MainChatBox>
                <BottomLayer>
                    <TextField id="standard-basic" label="Standard" style={{ backgroundColor: "white", borderBottomLeftRadius: "25px", 
                    borderBottomRightRadius: "25px", height: "6rem", width: "100rem" }} />
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
    margin-left: 70rem;
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
    color: white;
`;
