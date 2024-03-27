import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//api for user registration
export const createFeedback = async ({ type, feedback }) => {
  try {
    const reqUrl = `${backendUrl}/feedback/v1/createFeedback`;
    const reqPayload = { type, feedback };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};
