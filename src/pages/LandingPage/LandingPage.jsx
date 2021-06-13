import React from "react";
import { useApi } from "../../shared/api";
import bluePurpleImage from "../../assets/images/bg-01.jpg";
import styled from "styled-components";
import { Textfield } from "../../shared/components";
import { LandingPageButton } from "./LandingPageButton";
import { UserIcon } from "../../shared/icons";

export const LandingPage = () => {
  const [createSessionName, setCreateSessionName] = React.useState("");
  const [joinSessionName, setJoinSessionName] = React.useState("");

  const { createSession } = useApi();

  return (
    <Background bgImage={`url(${bluePurpleImage})`}>
      <Container>
        <Pane>
          <HeaderText>Create a new session.</HeaderText>
          <div style={{ margin: "5rem 0" }}>
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
            onClick={() => createSession().then((data) => console.log(data))}
            text="Create!"
          />
        </Pane>
        <div style={{ height: "100%", padding: "1rem" }}></div>
        <Pane>
          <HeaderText>Join a session</HeaderText>
          <div
            style={{
              margin: "5rem 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Textfield
              text={joinSessionName}
              setText={setJoinSessionName}
              placeholder="Enter room code"
              icon={
                <div style={{ padding: "0.3rem", paddingLeft: 0 }}>
                  <UserIcon />
                </div>
              }
            />
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
            onClick={() => console.log(joinSessionName)}
            text="Join!"
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
  background-image: ${({ bgImage }) => bgImage ?? "white"};
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
