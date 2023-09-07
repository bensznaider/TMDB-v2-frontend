import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRated } from "../state/thunks/moviesThunk";
import MovieCard from "../commons/MovieCard";
import {
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosRemoveCircle,
} from "react-icons/io";

const TopRated = () => {
  const dispatch = useDispatch();

  const topRated = useSelector((state) => {
    return state.movies.topRated;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const handleNext = () => {
    if (activeIndex < topRated.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handlePageDown = () => {
    if (pageIndex > 1) {
      dispatch(fetchTopRated(pageIndex - 1));
      setPageIndex(pageIndex - 1);
    }
  };

  const handlePageUp = () => {
    dispatch(fetchTopRated(pageIndex + 1));
    setPageIndex(pageIndex + 1);
  };

  return (
    <div>
      <div>Top Rated</div>
      <div>
        Page <IoIosRemoveCircle onClick={handlePageDown} style={{cursor: "pointer"}}/> {pageIndex}{" "}
        <IoIosAddCircle onClick={handlePageUp} style={{cursor: "pointer"}}/>
      </div>
      <div
        style={{
          height: "2px",
          margin: "auto",
          width: "30%",
          backgroundColor: "#272932",
        }}
      ></div>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {activeIndex > 0 ? (
          <IoIosArrowBack onClick={handlePrev} cursor={"pointer"} />
        ) : (
          <IoIosArrowBack color={"#b6c2d9"} />
        )}

        {topRated ? (
          <MovieCard movie={topRated[activeIndex]} />
        ) : (
          <span>LOADING...</span>
        )}
        {activeIndex < topRated.length - 1 ? (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        ) : (
          <IoIosArrowForward color={"#b6c2d9"} />
        )}
      </span>
    </div>
  );
};

export default TopRated;
