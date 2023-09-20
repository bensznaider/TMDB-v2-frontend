import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../state/thunks/moviesThunk";
import MovieData from "../components/MovieData";

const SelectedMovie = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    const getMovieDetails = async () => {
      const movie = await dispatch(fetchMovieDetails(movieId));
      setMovie(movie);
    };
    getMovieDetails();
  }, [movieId, dispatch]);

  return (
    <>
      {!movie ? (
        <div
          className={`${isMenuOpen ? "blur" : ""}`}
          style={{
            minHeight: "100vh",
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
      {deviceWidth <= 800 && movie && (
        <span style={{
          fontSize: "large",
        }}>
        <MovieData
          movie={movie}
          isMenuOpen={isMenuOpen}
          posterSize={"w780"}
        />
        </span>
      )}
      {deviceWidth > 800 && movie && (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.data.poster_path}`}
            alt="<Movie poster>"
            style={{marginTop: "5.7rem", height: "600px"}}
          />
        <span style={{
          fontSize: "small"
        }}>
        <MovieData
          movie={movie}
          isMenuOpen={isMenuOpen}
          posterSize={"w342"}
        />
        </span>
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
