import React from "react";
import { useApi } from "../../shared/api";
import { Button, TextField } from "@material-ui/core";

export const LandingPage = () => {
  const [createParticipantName, setCreateParticipantName] = React.useState("");
  const [joinSession, setJoinSessionName] = React.useState("");

  const { createSession } = useApi();

  return (
    <div>
      <h1>Chat App</h1>
      {/* creating session section */}
      <div>
        <p>Create a session</p>
        <TextField
          value={createParticipantName}
          onChange={(e) => setCreateParticipantName(e.target.value)}
        />
        <Button
          onClick={() => {
            if (createParticipantName !== "") createSession(createParticipantName).then((data) => alert("Your session code is " + data.sessionCode));
          }}
        >
          Submit
        </Button>
      </div>
      <div>
        <p>Join a session</p>
        <TextField
          value={joinSession}
          onChange={(e) => setJoinSessionName(e.target.value)}
        />
        <Button onClick={() => console.log(joinSession)}>Submit</Button>
      </div>
    </div>
  );
};
