import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//getAllProducts
export const getAllProducts = async () => {
  try {
    debugger;
    // const reqUrl = `${backendUrl}/product/v1/getAllProducts`;
    // const response = await axios.get(reqUrl);
    // return response.data;

    const response = await axios.get(`${backendUrl}/product/v1/getAllProducts`);
    if (response.status === 200) {
      return response.data.data; // Assuming your products are nested under 'data' key
    } 

  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};
