import "./App.css";
import React from "react";
import { Button, TextField } from "@material-ui/core";

function App() {
  const [createSessionName, setCreateSessionName] = React.useState("");
  const [joinSession, setJoinSessionName] = React.useState("");

  return (
    <div>
      <h1>Chat App</h1>
      {/* creating session section */}
      <div>
        <p>Create a session</p>
        <TextField
          value={createSessionName}
          onChange={(e) => setCreateSessionName(e.target.value)}
        />
        <Button onClick={() => console.log(createSessionName)}>Submit</Button>
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
}

export default App;
