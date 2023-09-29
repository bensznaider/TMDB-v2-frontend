import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../state/thunks/moviesThunk";
import MovieData from "../components/MovieData";

const SelectedMovie = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [posterHeight, setPosterHeight] = useState(null);

  const handlePosterHeight = () => {
    if (document.getElementById("movie-content")) {
      setPosterHeight(document.getElementById("movie-content").clientHeight);
    }
  }

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
      {deviceWidth <= 850 && movie && (
        <span
          style={{
            fontSize: "large",
          }}
        >
          <MovieData
            movie={movie}
            isMenuOpen={isMenuOpen}
            posterSize={"w780"}
            handlePosterHeight={handlePosterHeight}
            posterHeight={posterHeight}
          />
        </span>
      )}
      {deviceWidth > 850 && movie && (
        <div
          className={`${isMenuOpen ? "blur" : ""}`}
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#353844",
          }}
        >
          <span
            style={{
              width: `${deviceWidth / 2}px`,         
              display: "flex",
              flexDirection: "column",
              alignItems: "end" ,
              marginTop: "5.7rem",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.data.poster_path}`}
              alt="<Movie poster>"
              style={{
                minHeight: "100vh",
                height: `${posterHeight}px`
              }}
            />
          </span>
          <span
            style={{
              fontSize: "large",
            }}
          >
            <MovieData
              movie={movie}
              isMenuOpen={isMenuOpen}
              posterSize={"w342"}
              handlePosterHeight={handlePosterHeight}
              posterHeight={posterHeight}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
