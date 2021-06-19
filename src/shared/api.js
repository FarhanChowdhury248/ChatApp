import axios from "axios";
import { API_ROOT } from "./constants";

export const useApi = () => ({

  createParticipant: (userName) => 
    axios
      .post(`${API_ROOT}/participants/create`, {"userName": userName})
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  
  createSession: (userName) =>
    axios
      .post(`${API_ROOT}/participants/create`, {"userName": userName})
      .then((res) => axios.post(`${API_ROOT}/sessions/create`, {"hostId": res.data.particpantId})
      .then((res) => res.data).catch((err) => console.error(err)))
      .catch((err) => console.error(err)),
});
