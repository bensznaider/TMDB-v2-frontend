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

export const login = (user) => async () => {
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
    return response
  }
  catch (err) {
    throw err;
  }
}

export const logout = (dispatch) => async () => {
  try {
    await dispatch(setLoggedUser({ userId: null, email: null }))
    localStorage.removeItem("token");
    return
  }
  catch (err) {
    throw err;
  }
}