import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../state/thunks/moviesThunk";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const SelectedMovie = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [completeCast, setCompleteCast] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movie = await dispatch(fetchMovieDetails(movieId));
      setMovie(movie);
      console.log(movie);
    };
    getMovieDetails();
  }, [movieId, dispatch]);

  const handleCompleteCast = () => {
    !completeCast ? setCompleteCast(true) : setCompleteCast(false);
  };

  const handleFavorite = () => {

  }

  const Loading = () => {
    let word = "Loading"
    setInterval(()=>{
      word+="."
    }, 1000)
    return word
  }

  return (
    <>
      {!movie ? (
        <div
          className={`${isMenuOpen ? "blur" : ""}`}
          style={{ margin: "13rem 12rem" }}
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
              <span onClick={handleFavorite} style={{ cursor: "pointer" }}> <MdFavoriteBorder /></span>
            </span>
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
