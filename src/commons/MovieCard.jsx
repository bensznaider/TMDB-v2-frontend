import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <>
      {movie ? (
        <div>
          <img
            className="movie-card-background"
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          />
          <div className="movie-card-content">
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
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
