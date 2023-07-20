import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const Welcome = () => {
  const [postersURL, setPostersURL] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/movies/now-playing`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        let postersArray = [];
        for (let i = 0; i < 5; i++) {
          postersArray.push(
            `https://image.tmdb.org/t/p/w185${response.data.results[i].poster_path}`
          );
        }
        setPostersURL(postersArray);
      })
      .catch((error) => console.log("ERROR", error));
  }, []);

  return (
    <div className="welcome-posters-container" style={{ marginTop: "5.5rem" }}>
      <Marquee className="welcome-posters-marquee">
        {postersURL ? (
          <>
            <img src={postersURL[0]} />
            <img src={postersURL[1]} />
            <img src={postersURL[2]} />
            <img src={postersURL[3]} />
            <img src={postersURL[4]} />
          </>
        ) : (
          <></>
        )}
      </Marquee>
      <div className="welcome-static-text">
      <h1>Welcome to TMDB.</h1>
      <p style={{fontSize: "larger"}}>
        Explore. Thousands of movies of all time are waiting.
      </p>
      </div>
    </div>
  );
};

export default Welcome;
