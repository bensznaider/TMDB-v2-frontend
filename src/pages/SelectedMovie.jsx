import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../state/thunks/moviesThunk";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../state/thunks/favoritesThunk";

const SelectedMovie = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [completeCast, setCompleteCast] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);
  const [isFav, setIsFav] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const setFavFunction = async () => {
      try {
        if (loggedUser.userId) {
          const favs = await dispatch(getFavorites(loggedUser.userId));
          if (favs.data.find((fav) => fav.tmdbId === parseInt(movieId))) {
            setIsFav(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setFavFunction();
  }, [dispatch, getFavorites, loggedUser, movieId, setIsFav]);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movie = await dispatch(fetchMovieDetails(movieId));
      setMovie(movie);
    };
    getMovieDetails();
  }, [movieId, dispatch]);

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
        tmdbId: movieId,
        userId: loggedUser.userId,
        year: movie.data.release_date.substring(0, 4),
        posterURL: movie.data.poster_path,
      };
      dispatch(removeFavorite(movieData));
      setIsFav(false);
    } else if (!isFav && loggedUser.userId) {
      const movieData = {
        title: movie.data.original_title,
        tmdbId: movieId,
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
      {!movie ? (
        <div
          className={`${isMenuOpen ? "blur" : ""}`}
          style={{
            minHeight: "96vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "large",
          }}
        >
          LOADING...
        </div>
      ) : (
        <></>
      )}
      {movie && !completeCast ? (
        <div className={`selected-movie-container ${isMenuOpen ? "blur" : ""}`}>
          <img
            className="selected-movie-background"
            src={`https://image.tmdb.org/t/p/w780${movie.data.poster_path}`}
            alt="<Movie poster>"
          />
          <div className="selected-movie-content">
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
            {errorMessage ? (
              <span
                style={{
                  background: "linear-gradient(#272932, #353844)",
                  color: "#b6c2d9",
                  borderRadius: "0 1.5rem 0",
                  width: "60%",
                  padding: "0.3rem 0",
                  margin: "auto",
                }}
              >
                {errorMessage}
              </span>
            ) : (
              <></>
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
              <div> {movie.data.genres.map((genre) => genre.name + ", ")}</div>
            </span>
            <span style={{ margin: "0.5rem" }}>
              <div>Cast:</div>
              <div>
                {movie.credits.cast
                  .slice(0, 5)
                  .map((actor) => `${actor.name} (${actor.character}), `)}
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
      ) : (
        <></>
      )}
      {movie && completeCast ? (
        <div className={`selected-movie-container ${isMenuOpen ? "blur" : ""}`}>
          <img
            className="selected-movie-background"
            src={`https://image.tmdb.org/t/p/w780${movie.data.poster_path}`}
            alt="<Movie poster>"
          />
          <div className="selected-movie-content">
            <span style={{ margin: "0.5rem" }}>
              <div>Cast:</div>
              <div>
                {movie.credits.cast
                  .slice(0, 60)
                  .map((actor) => `${actor.name} (${actor.character}), `)}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectedMovie;
