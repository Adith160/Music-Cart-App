import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//getAllProducts
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/product/v1/getAllProducts`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//getAllProducts
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/product/v1/getProductById/${productId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};
