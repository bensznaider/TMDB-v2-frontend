import { useState } from "react";
import PostersMarquee from "./PostersMarquee";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByString } from "../state/thunks/moviesThunk";

const Welcome = ({ toggleSearch }) => {
  const dispatch = useDispatch()
  const nowPlaying = useSelector((state) => {
    return state.movies.nowPlaying;
  });

  const [movieName, setMovieName] = useState("")

  const handleOnChange = (event) => {
    setMovieName(event.target.value)
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    const searchResults = await dispatch(fetchMoviesByString(movieName, 1, true))
    if (searchResults.length > 0) {
      toggleSearch(movieName, true)
    }
    else {
      toggleSearch(movieName, false)
    }
  }

  return (
    <div className="welcome-posters-container" style={{ marginTop: "5.5rem" }}>
      {nowPlaying ? <PostersMarquee movies={nowPlaying} /> : <></>}
      <div className="welcome-static-text">
        <h1>Welcome to TMDB.</h1>
        <p style={{ fontSize: "larger" }}>
          Explore. Thousands of movies of all time are waiting.
        </p>
        <form onSubmit={handleSearch}>
          <input
            className="welcome-search"
            type="text"
            value={movieName}
            onChange={handleOnChange}
            placeholder="Type your movie here..."
          />
          <button className="welcome-search search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
