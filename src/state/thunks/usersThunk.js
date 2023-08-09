import axios from "axios";

axios.defaults.withCredentials = true;

export const createUser = (user) => async (dispatch) => {
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
