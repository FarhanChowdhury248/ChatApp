import React from "react";
import { useApi } from "../../shared/api";
import styled from "styled-components";
import { Textfield } from "../../shared/components";
import { LandingPageButton } from "./LandingPageButton";
import { UserIcon, KeyIcon } from "../../shared/icons";
import { PATHS } from "../../shared/constants";
import { LandingPageDialog } from "./LandingPageDialog";
import { useHistory } from "react-router-dom";

export const LandingPage = ({ setSessionData }) => {
  const [createSessionName, setCreateSessionName] = React.useState("");
  const [joinSessionCode, setJoinSessionCode] = React.useState("");
  const [joinSessionName, setJoinSessionName] = React.useState("");
  const { createSession, joinSession } = useApi();
  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);

  return (
    <Background>
      <Container tabIndex={"0"}>
        <Pane>
          <HeaderText>Create a new session.</HeaderText>
          <div style={{ margin: "5rem 0", marginBottom: "10rem" }}>
            <Textfield 
              text={createSessionName}
              setText={setCreateSessionName}
              placeholder="Enter your nickname"
              icon={
                <div style={{ padding: "0.3rem", paddingLeft: 0 }}>
                  <UserIcon />
                </div>
              }
            />
          </div>
          <LandingPageButton
            onClick={() =>
              createSession(createSessionName).then((data) => {
                window.sessionStorage.setItem(
                  "current_username",
                  createSessionName
                );
                window.sessionStorage.setItem(
                  "sessionData",
                  JSON.stringify(data)
                );
                history.push(PATHS.SESSION_PAGE);
              })
            }
            text="Create!"
            disabled={createSessionName.trim().length === 0}
          />
        </Pane>
        <div
          style={{
            height: "75%",
            margin: "1rem",
            padding: "0.3rem",
            backgroundColor: "#555555",
          }}
        />
        <Pane>
          <HeaderText>Join a session</HeaderText>
          <div
            style={{
              margin: "2rem 0",
              marginBottom: "5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Textfield
              text={joinSessionCode}
              setText={setJoinSessionCode}
              placeholder="Enter room code"
              icon={
                <div style={{ padding: "0.3rem", paddingLeft: 0 }}>
                  <KeyIcon />
                </div>
              }
            />
            <div style={{ width: "100%", padding: "2rem" }}></div>
            <Textfield
              text={joinSessionName}
              setText={setJoinSessionName}
              placeholder="Enter your nickname"
              icon={
                <div style={{ padding: "0.3rem", paddingLeft: 0 }}>
                  <UserIcon />
                </div>
              }
            />
          </div>
          <LandingPageButton
            onClick={() => {
              joinSession(joinSessionName, joinSessionCode).then((data) => {
                if (!data) setShowModal(true);
                else {
                  window.sessionStorage.setItem(
                    "current_username",
                    joinSessionName
                  );
                  window.sessionStorage.setItem(
                    "sessionData",
                    JSON.stringify(data)
                  );
                  history.push(PATHS.SESSION_PAGE);
                }
              });
            }}
            text="Join!"
            disabled={
              joinSessionCode.trim().length === 0 ||
              joinSessionName.trim().length === 0
            }
          />
          <LandingPageDialog
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </Pane>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(90deg, #09d3df 0%, #ec0dfc 100%);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  border-radius: 2rem;
  margin: 8rem;
`;

const HeaderText = styled.p`
  font-size: 2.5rem;
  line-height: 4.3rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  color: #888888;
`;

const Pane = styled.div`
  padding: 6rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
