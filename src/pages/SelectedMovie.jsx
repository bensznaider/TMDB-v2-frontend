import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../state/thunks/moviesThunk";

const SelectedMovie = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movie = await dispatch(fetchMovieDetails(movieId));
      setMovie(movie);
    };
    getMovieDetails();
  }, [movieId, dispatch]);

  return (
    <>
      {movie ? (
        <div
          className={`${isMenuOpen ? "blur" : ""}`}
          style={{ textAlign: "center", marginTop: "25rem" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt="<Movie poster>"
          />
          <p>{movie.original_title}</p>
        </div>
      ) : (
        <>
          <p>LOADING...</p>
          <p>LOADING...</p>
          <p>LOADING...</p>
          <p>LOADING...</p>
          <p>LOADING...</p>
        </>
      )}
    </>
  );
};

export default SelectedMovie;
