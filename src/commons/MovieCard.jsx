import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieSelector = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      {movie ? (
        <div className="movie-card-container" >
          <span onClick={handleMovieSelector}>
          {movie.poster_path ? (
            <img
              className="movie-card-background"
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.original_title}             
            />
          ) : (
            <span
              className="movie-card-background"
              style={{
                height: "11rem",
                width: "6rem",
                marginBottom: "1rem",
                marginTop: "1rem",
                marginRight: "2.5rem",
                marginLeft: "2.5rem",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "#272932",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></span>
          )}
          <div className="movie-card-content">
            <span>{movie.original_title}</span>
            {movie.release_date != "" ? (
              <span>({movie.release_date.substring(0, 4)})</span>
            ) : (
              <span>(N/A)</span>
            )}
            {movie.vote_average ? (
              <span>Avg. rating: {movie.vote_average}/10</span>
            ) : (
              <span>Avg. rating: N/A</span>
            )}
          </div>
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieCard;
