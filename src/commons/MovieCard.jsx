import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieSelector = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      {movie ? (
        <div className="movie-card-container" onClick={handleMovieSelector}>
          <img
            className="movie-card-background"
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          />
          <div className="movie-card-content">
            <span>{movie.original_title}</span>
            <span>({movie.release_date.substring(0, 4)})</span>
            <span>Avg. rating: {movie.vote_average}/10</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieCard;
