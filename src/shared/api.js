import axios from "axios";
import { API_ROOT } from "./constants";

export const useApi = () => ({
  createSession: () =>
    axios
      .post(`${API_ROOT}/sessions/create`, {})
      .then((res) => res.data)
      .catch((err) => console.error(err)),
});
