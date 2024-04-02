import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//api for user registration
export const addToMycart = async (productData) => {
  try {
    const reqUrl = `${backendUrl}/invoice/v1/addToCart`;
    const reqPayload = productData ;
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

//api for user registration
export const createInvoice = async (productData) => {
  try {
    const reqUrl = `${backendUrl}/invoice/v1/createInvoice`;
    const reqPayload = productData ;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    debugger;
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

//api for user registration
export const getMyCart = async () => {
  try {
    const reqUrl = `${backendUrl}/invoice/v1/getMyCart`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for user registration
export const getAllInvoices = async () => {
  try {
    const reqUrl = `${backendUrl}/invoice/v1/getAllInvoices`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for user registration
export const getInvoiceById = async (invId) => {
  try {
    const reqUrl = `${backendUrl}/invoice/v1/getInvoiceById/${invId}`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};


