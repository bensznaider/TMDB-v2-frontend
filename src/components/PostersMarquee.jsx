import Marquee from "react-fast-marquee";

const PostersMarquee = ({ movies }) => {

  return (
    <>
      <Marquee className="welcome-posters-marquee">
        {movies.map((movie) => 
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={"Movie poster"}/>
        )}
      </Marquee>
    </>
  );
};

export default PostersMarquee;
