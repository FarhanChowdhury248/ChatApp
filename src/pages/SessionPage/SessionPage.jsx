import React from "react";
import './SessionPage.css';
import styled from "styled-components";

export const SessionPage = () => {
  return (
  <Background>
    <div className="top-info-bar">
      <h1 className="info-element1">Users: </h1>
      <h1 className="info-element-main">Welcome to WeChat</h1>
      <h1 className="info-element2">Room Code: </h1>
    </div>
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
