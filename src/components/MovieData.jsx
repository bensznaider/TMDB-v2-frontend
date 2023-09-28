import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../state/thunks/favoritesThunk";

const MovieData = ({ movie, isMenuOpen, posterSize }) => {
  const dispatch = useDispatch();
  const [completeCast, setCompleteCast] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);
  const [isFav, setIsFav] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [posterHeight, setPosterHeight] = useState(null);

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    if (document.getElementById("movie-content")) {
      setPosterHeight(document.getElementById("movie-content").clientHeight);
    }
  }, []);

  useEffect(() => {
    const setFavFunction = async () => {
      try {
        if (loggedUser.userId) {
          const favs = await dispatch(getFavorites(loggedUser.userId));
          if (favs.data.find((fav) => fav.tmdbId === parseInt(movie.data.id))) {
            setIsFav(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setFavFunction();
  }, [dispatch, getFavorites, loggedUser, setIsFav]);

  const handleCompleteCast = () => {
    !completeCast ? setCompleteCast(true) : setCompleteCast(false);
  };

  const handleFavorite = () => {
    if (!loggedUser.userId) {
      setErrorMessage("Please log in to add favorites.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } else if (isFav && loggedUser.userId) {
      const movieData = {
        title: movie.data.original_title,
        tmdbId: movie.data.id,
        userId: loggedUser.userId,
        year: movie.data.release_date.substring(0, 4),
        posterURL: movie.data.poster_path,
      };
      dispatch(removeFavorite(movieData));
      setIsFav(false);
    } else if (!isFav && loggedUser.userId) {
      const movieData = {
        title: movie.data.original_title,
        tmdbId: movie.data.id,
        userId: loggedUser.userId,
        year: movie.data.release_date.substring(0, 4),
        posterURL: movie.data.poster_path,
      };
      dispatch(addFavorite(movieData));
      setIsFav(true);
    }
  };

  return (
    <>
      {movie && !completeCast ? (
        <div
          className={`selected-movie-container ${isMenuOpen ? "blur" : ""}`}
          style={{ overflowX: "hidden" }}
        >
          <div
            style={{
              position: "relative",
              width: "66vh",
              maxWidth: `${deviceWidth <= 850 ? "100vw" : ""}`,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/${posterSize}${movie.data.poster_path}`}
              alt="<Movie poster>"
              style={{
                opacity: 0.3,
                minHeight: "100vh",
                height: `${posterHeight ? `${posterHeight}px` : "auto"}`
              }}
            />
            <div id="movie-content" className="selected-movie-content">
              <span
                style={{
                  fontSize: "x-large",
                  borderStyle: "solid",
                  borderColor: "white",
                  borderRadius: "0 1.5rem 0",
                  margin: "0.5rem",
                }}
              >
                {movie.data.original_title} (
                {movie.data.release_date.substring(0, 4)})
                <span onClick={handleFavorite} style={{ cursor: "pointer" }}>
                  {" "}
                  {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                </span>
              </span>
              {errorMessage && (
                <span
                  style={{
                    background: "#b6c2d9",
                    color: "#272932",
                    borderRadius: "0 1.5rem 0",
                    width: "60%",
                    padding: "0.3rem 0",
                    margin: "auto",
                    textShadow: "none",
                  }}
                >
                  {errorMessage}
                </span>
              )}
              <span style={{ margin: "0.5rem" }}>{movie.data.overview}</span>
              <span style={{ margin: "0.5rem" }}>
                <div>Screenplay:</div>
                <div>
                  {movie.credits.crew.map((member) => {
                    if (member.job === "Screenplay")
                      return " " + member.name + ", ";
                  })}
                </div>
              </span>
              <span style={{ margin: "0.5rem" }}>
                <div>Director:</div>
                <div>
                  {" "}
                  {movie.credits.crew.map((member) => {
                    if (member.job === "Director") return member.name + ", ";
                  })}
                </div>
              </span>
              <span style={{ margin: "0.5rem" }}>
                <div>Producers:</div>
                <div>
                  {" "}
                  {movie.credits.crew.map((member) => {
                    if (member.job === "Producer") return member.name + ", ";
                  })}
                </div>
              </span>
              <span style={{ margin: "0.5rem" }}>
                <div>Genres:</div>
                <div>
                  {" "}
                  {movie.data.genres.map((genre) => genre.name + ", ")}
                </div>
              </span>
              <span style={{ margin: "0.5rem" }}>
                <div>Cast:</div>
                <div>
                  {movie.credits.cast
                    .slice(0, 5)
                    .map(
                      (actor) => `${actor.name} (${actor.character || "N/A"}), `
                    )}
                  <span
                    style={{ fontStyle: "italic", cursor: "pointer" }}
                    onClick={handleCompleteCast}
                  >
                    (show more)
                  </span>
                </div>
              </span>
              <span style={{ margin: "0.5rem" }}>
                <div>Avg. rating:</div> <div>{movie.data.vote_average}/10</div>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {movie && completeCast ? (
        <div
          className={`selected-movie-container ${isMenuOpen ? "blur" : ""}`}
          style={{ overflowX: "hidden" }}
        >
            <div
            style={{
              position: "relative",
              width: "66vh",
              maxWidth: `${deviceWidth <= 850 ? "100vw" : ""}`,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/${posterSize}${movie.data.poster_path}`}
              alt="<Movie poster>"
              style={{
                opacity: 0.3,
                minHeight: "100vh",
                height: `${posterHeight ? `${posterHeight}px` : "auto"}`
              }}
            />
            <div className="selected-movie-content">
              <span style={{ margin: "0.5rem" }}>
                <div>Cast:</div>
                <div>
                  {movie.credits.cast
                    .slice(0, 60)
                    .map(
                      (actor) => `${actor.name} (${actor.character || "N/A"}), `
                    )}
                  <span
                    style={{ fontStyle: "italic", cursor: "pointer" }}
                    onClick={handleCompleteCast}
                  >
                    (back)
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieData;
