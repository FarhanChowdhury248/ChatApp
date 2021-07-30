import axios from "axios";
import { API_ROOT } from "./constants";

export const useApi = () => ({
  createParticipant: (userName, role) =>
    axios
      .post(`${API_ROOT}/participants/create`, {
        userName: userName,
        role: role,
      })
      .then((res) => res.data)
      .catch((err) => console.error(err)),

  createSession: (userName) =>
    axios
      .post(`${API_ROOT}/sessions/create`, { userName: userName })
      .then((res) => res.data)
      .catch((err) => console.error(err)),

  joinSession: (username, sessionCode) =>
    axios
      .put(`${API_ROOT}/sessions/join`, { username, sessionCode })
      .then((res) => res.data)
      .catch((err) => console.error(err)),
});
