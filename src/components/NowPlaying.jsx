import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlaying } from "../state/thunks/moviesThunk";
import MovieCard from "../commons/MovieCard";
import {
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosRemoveCircle,
} from "react-icons/io";

const NowPlaying = () => {
  const dispatch = useDispatch();

  const deviceWidth = window.innerWidth;

  const nowPlaying = useSelector((state) => {
    return state.movies.nowPlaying;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const handleNext = () => {
    if (activeIndex < nowPlaying.length - 1) {
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
      dispatch(fetchNowPlaying(pageIndex - 1));
      setPageIndex(pageIndex - 1);
      setActiveIndex(0);
    }
  };

  const handlePageUp = () => {
    dispatch(fetchNowPlaying(pageIndex + 1));
    setPageIndex(pageIndex + 1);
    setActiveIndex(0);
  };

  return (
    <div>
      <div>Now Playing</div>
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

        {nowPlaying ? (
          <>
            {deviceWidth <= 600 && (
              <MovieCard movie={nowPlaying[activeIndex]} />
            )}
            {deviceWidth > 600 && deviceWidth <= 800 && (
              <>
                <MovieCard movie={nowPlaying[activeIndex]} />
                <MovieCard movie={nowPlaying[activeIndex + 1]} />
              </>
            )}
            {deviceWidth > 800 && deviceWidth <= 1000 && (
              <>
                <MovieCard movie={nowPlaying[activeIndex]} />
                <MovieCard movie={nowPlaying[activeIndex + 1]} />
                <MovieCard movie={nowPlaying[activeIndex + 2]} />
              </>
            )}
            {deviceWidth > 1000 && deviceWidth <= 1200 && (
              <>
                <MovieCard movie={nowPlaying[activeIndex]} />
                <MovieCard movie={nowPlaying[activeIndex + 1]} />
                <MovieCard movie={nowPlaying[activeIndex + 2]} />
                <MovieCard movie={nowPlaying[activeIndex + 3]} />
              </>
            )}
            {deviceWidth > 1200 && (
              <>
                <MovieCard movie={nowPlaying[activeIndex]} />
                <MovieCard movie={nowPlaying[activeIndex + 1]} />
                <MovieCard movie={nowPlaying[activeIndex + 2]} />
                <MovieCard movie={nowPlaying[activeIndex + 3]} />
                <MovieCard movie={nowPlaying[activeIndex + 4]} />
              </>
            )}
          </>
        ) : (
          <></>
        )}
        {deviceWidth <= 600 && activeIndex < nowPlaying.length - 1 && (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        )}
        {deviceWidth > 600 &&
          deviceWidth <= 800 &&
          activeIndex < nowPlaying.length - 2 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 800 &&
          deviceWidth <= 1000 &&
          activeIndex < nowPlaying.length - 3 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 1000 &&
          deviceWidth <= 1200 &&
          activeIndex < nowPlaying.length - 4 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 1200 && activeIndex < nowPlaying.length - 5 && (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        )}
      </span>
    </div>
  );
};

export default NowPlaying;
