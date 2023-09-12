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

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

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
      setActiveIndex(0);
    }
  };

  const handlePageUp = () => {
    dispatch(fetchTopRated(pageIndex + 1));
    setPageIndex(pageIndex + 1);
    setActiveIndex(0);
  };

  return (
    <div>
      <div>Top Rated</div>
      <div>
        Page{" "}
        <IoIosRemoveCircle
          onClick={handlePageDown}
          style={{ cursor: "pointer" }}
        />{" "}
        {pageIndex}{" "}
        <IoIosAddCircle onClick={handlePageUp} style={{ cursor: "pointer" }} />
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
          <>
            {deviceWidth <= 600 && <MovieCard movie={topRated[activeIndex]} />}
            {deviceWidth > 600 && deviceWidth <= 800 && (
              <>
                <MovieCard movie={topRated[activeIndex]} />
                <MovieCard movie={topRated[activeIndex + 1]} />
              </>
            )}
            {deviceWidth > 800 && deviceWidth <= 1000 && (
              <>
                <MovieCard movie={topRated[activeIndex]} />
                <MovieCard movie={topRated[activeIndex + 1]} />
                <MovieCard movie={topRated[activeIndex + 2]} />
              </>
            )}
            {deviceWidth > 1000 && deviceWidth <= 1200 && (
              <>
                <MovieCard movie={topRated[activeIndex]} />
                <MovieCard movie={topRated[activeIndex + 1]} />
                <MovieCard movie={topRated[activeIndex + 2]} />
                <MovieCard movie={topRated[activeIndex + 3]} />
              </>
            )}
            {deviceWidth > 1200 && (
              <>
                <MovieCard movie={topRated[activeIndex]} />
                <MovieCard movie={topRated[activeIndex + 1]} />
                <MovieCard movie={topRated[activeIndex + 2]} />
                <MovieCard movie={topRated[activeIndex + 3]} />
                <MovieCard movie={topRated[activeIndex + 4]} />
              </>
            )}
          </>
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

/*
          <>
            {deviceWidth <= 600 && activeIndex < topRated.length - 1 ? (<IoIosArrowForward onClick={handleNext} cursor={"pointer"} />) : <IoIosArrowForward color={"#b6c2d9"} />}
            {deviceWidth > 600 && deviceWidth <= 800 && activeIndex < topRated.length - 2 ? (<IoIosArrowForward onClick={handleNext} cursor={"pointer"} />) : <IoIosArrowForward color={"#b6c2d9"} />}
            {deviceWidth > 800 && deviceWidth <= 1000 && activeIndex < topRated.length - 3 ? (<IoIosArrowForward onClick={handleNext} cursor={"pointer"} />) : <IoIosArrowForward color={"#b6c2d9"} />}
            {deviceWidth > 1000 && deviceWidth <= 1200 && activeIndex < topRated.length - 4 ? (<IoIosArrowForward onClick={handleNext} cursor={"pointer"} />) : <IoIosArrowForward color={"#b6c2d9"} />}
            {deviceWidth > 1200 && activeIndex < topRated.length - 5 ? (<IoIosArrowForward onClick={handleNext} cursor={"pointer"} />) : <IoIosArrowForward color={"#b6c2d9"} />}
          </>
*/
