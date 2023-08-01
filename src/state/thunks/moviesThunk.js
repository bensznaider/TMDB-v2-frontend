import axios from "axios";
import { setNowPlaying, setTopRated, setSearchResults } from "../slices/moviesSlice";

axios.defaults.withCredentials = true;

export const fetchMoviesByString = (movieString) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/movies/search?movie=${movieString}`
    );
    dispatch(setSearchResults(response.data.results));
  } catch (err) {
    console.error("Fetch Movies By String error: ", err);
  }
};

export const fetchNowPlaying = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/movies/now-playing`
    );
    dispatch(setNowPlaying(response.data.results));
  } catch (err) {
    console.error("Fetch Now Playing list error: ", err);
  }
};

export const fetchTopRated = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/movies/top-rated`
    );
    dispatch(setTopRated(response.data.results));
  } catch (err) {
    console.error("Fetch Top Rated list error: ", err);
  }
};

export const fetchMovieDetails = (id) => async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/movies/details/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Fetch Movie Details By ID error: ", err);
  }
};
