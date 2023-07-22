import { useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../commons/MovieCard";

const TopRated = () => {
  const topRated = useSelector((state) => {
    return state.movies.topRated;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % (topRated ? topRated.length : 1));
  };

  const handlePrev = () => {
    setActiveIndex(
      (activeIndex - 1 + (topRated ? topRated.length : 1)) %
        (topRated ? topRated.length : 1)
    );
  };

  return (
    <div>
      <div>Top Rated</div>
      <button onClick={handlePrev}>Previous</button>
      {topRated ? (<MovieCard movie={topRated[activeIndex]} />) : (<span>LOADING...</span>)}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default TopRated;
