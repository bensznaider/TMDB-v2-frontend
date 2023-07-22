import PostersMarquee from "./PostersMarquee";
import { useSelector } from "react-redux";

const Welcome = () => {
  const nowPlaying = useSelector((state) => {
    return state.movies.nowPlaying;
  });

  return (
    <div className="welcome-posters-container" style={{ marginTop: "5.5rem" }}>
      {nowPlaying ? (
        <PostersMarquee movies={nowPlaying} />
      ) : (
        <></>
      )}
      <div className="welcome-static-text">
        <h1>Welcome to TMDB.</h1>
        <p style={{ fontSize: "larger" }}>
          Explore. Thousands of movies of all time are waiting.
        </p>
        <input
          className="welcome-search"
          type="text"
          placeholder="Type your movie here..."
        />
        <button className="welcome-search search-button">Search</button>
      </div>
    </div>
  );
};

export default Welcome;
