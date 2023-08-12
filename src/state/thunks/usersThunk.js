import axios from "axios";
import { setLoggedUser } from "../slices/userSlice.js" 

axios.defaults.withCredentials = true;

export const createUser = (user) => async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/signup`,
      user
    );
    return response
  } catch (err) {
    throw err;
  }
};

export const loginUser = (user) => async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      user
    );
    localStorage.setItem("token", JSON.stringify(response.data));
    return response
  }
  catch (err) {
    throw err;
  }
}

export const reloadUser = () => async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/me`,
      token
    );
    console.log(response)
    return response
  }
  catch (err) {
    throw err;
  }
}
