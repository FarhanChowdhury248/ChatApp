import axios from "axios";
import { API_ROOT } from "./constants";

export const useApi = () => ({

  createParticipant: (userName) => 
    axios
      .post(`${API_ROOT}/participants/create`, {"userName": userName})
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  
  createSession: (hostId) =>
    axios
      .post(`${API_ROOT}/sessions/create`, {"hostId": hostId})
      .then((res) => res.data)
      .catch((err) => console.error(err)),
});
