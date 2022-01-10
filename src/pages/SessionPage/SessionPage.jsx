import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
import { ParticipantCard } from "./ParticipantCard";
import { ChatBox } from "./ChatBox";
import io from "socket.io-client";

export const SessionPage = ({ sessionData }) => {
  const [numChats, setNumchats] = React.useState(0);
  const [mainChatId, setMainChatId] = React.useState("");
  const [currentTab, setCurrentTab] = React.useState(0);
  // const [tabsValues, setTabsValues] = React.useState(1);
  const [tabs, setTabs] = React.useState([{key:"EVERYONE", component: <Tab style={{ fontSize: "1.4rem" }} label="EVERYONE" value={0} />}]);
  const [chats, setChats] = React.useState([]); 
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  
  const [currentChatView, setCurrentChatView] = React.useState("");

  const handleChange = (event, newValue) => {
    console.log(currentTab);
    setCurrentTab(newValue);
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
    socket.on("updateParticipants", ({ participants }) => {
        if (mainChatId === "") {  
          setParticipants(participants)
        }
      }
    );
    socket.on("createdChat", ({ members, sessionId, id, content }) => {
      console.log("created it");
      console.log(id);
      if (mainChatId === "") {  
        setChats([{value: numChats, chatId: id}]);
        setMainChatId(id);
        setCurrentChatView(id);
      }

      else {
        console.log("current sel");
        console.log(members);
        let tabLabel = "";
        for (let i = 0; i < members.length; i++) {
          tabLabel = tabLabel + ", " + members[i];
        }
      
        setNumchats(numChats+1);
        setChats(chats.concat({value: numChats, chatId: id}));
        console.log(numChats);
        setTabs(tabs.concat({key:id, component: <Tab style={{ fontSize: "1.4rem", color: "#8b898f" }} label={tabLabel} value={numChats} />}));
        setCurrentSelection([])
        setCurrentTab(numChats)
      //setCurrentChatView(chats.at(numChats).chatId);
      }
        });
  }, [socket]);

  // useEffect(() => {
    
  //   socket.on("createdChat", ())

  // }, [mainChatId]);

  // const chatFunction = () => {

  // }

  const newChat = () => {
    if (currentSelection.length != 0) {
      console.log("curr sel > 0")
      socket.emit("createChat", {
        members: currentSelection,
        sessionId: sessionData.sessionId,
      });
        
    }
  };

  const cardSelected = (participantIds, participantNames) => {
    // if (currentSelection.includes(participantIds.at(0))) {
    //   console.log("if");
    //   setCurrentSelection(currentSelection.filter(selection => selection != participantIds.at(0)));
    //   console.log(currentSelection);
      
    // }

    // else { 
      console.log("particpants");
      console.log(participantIds);
      console.log("else");
      setCurrentSelection(currentSelection.concat(participantIds));
    //}
    
  }

  const createTabs = (names) => {
    if (currentSelection.length != 0) {
      return <Tab style={{ fontSize: "1.4rem" }} label={currentSelection.toString()} value={99} />
    }

    else return <span></span>
  }

  const getParticipantCards = () =>
    participants.map((participant, i) => (
      <CardContainer onClick={() => cardSelected([participant._id], [participant.name])} key={i}>
        <ParticipantCard label={participant.name} />
      </CardContainer>
    ));

  const createChatButton = () => {
    if (currentSelection.length != 0) {
      return <Fab style={{position: "sticky", height: "5rem", width: "10rem", bottom: "10rem", backgroundColor: "#EF5DF1"}} onClick={newChat}>
      
        Create Chat</Fab>
    }

    else {
      return <div></div>
    }
  }

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
        <div style={{display: "flex", flexDirection: "column-reverse", float: "left", position: "absolute", left: "35rem", bottom: "8rem"}}>
          {createChatButton()}
        </div>
        {
          <div style={{display: "flex", flexDirection: "column", width: "40%", float: "right", marginTop: "1rem" }}>
          <TopLayer>
          <Tabs
            fullWidth
            indicatorColor="primary"
            value={currentTab}
            onChange={handleChange} 
            variant="scrollable"
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
            }}
          >
            {tabs.map((tab) => tab.component)}
          </Tabs>
        </TopLayer>
          <ChatBox
            participantId={sessionData.participantId}
            socket={socket}
            chatId={currentChatView}
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