import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//api for user registration
export const registerUser = async ({ name, mobile, email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/v1/register`;
    const reqPayload = { name, mobile, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for user login
export const loginUser = async ({ credential, password }) => {
  try {
    debugger;
    const reqUrl = `${backendUrl}/auth/v1/login`;
    const reqPayload = { credential, password };
    const response = await axios.post(reqUrl, reqPayload);

    if (response.status === 201) return response.data;
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

