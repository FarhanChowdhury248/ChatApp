import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container } from '@material-ui/core';
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
    
    return (
        <ChatContainer>
            <Container fixed maxWidth="md">
                <TopLayer>
                    <Tabs style={{ backgroundColor: "white"}}>
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 1" />
                        <Tab style={{ fontSize: "1.4rem" }} label="Chat 2" />
                    </Tabs>
                </TopLayer>
                <MainChatBox>
                </MainChatBox>
                <BottomLayer></BottomLayer>
            </Container>
        </ChatContainer>
    );

};

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    float: right;
    height: 90%;
    top:0;
    left: 0;
    bottom: 0;
    right: 500;
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
