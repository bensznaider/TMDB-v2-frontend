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
    }
  };

  const handlePageUp = () => {
    dispatch(fetchNowPlaying(pageIndex + 1));
    setPageIndex(pageIndex + 1);
  };

  return (
    <div>
      <div>Now Playing</div>
      <div>
        Page <IoIosRemoveCircle onClick={handlePageDown} /> {pageIndex}{" "}
        <IoIosAddCircle onClick={handlePageUp} />
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
          <MovieCard movie={nowPlaying[activeIndex]} />
        ) : (
          <span>LOADING...</span>
        )}
        {activeIndex < nowPlaying.length - 1 ? (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        ) : (
          <IoIosArrowForward color={"#b6c2d9"} />
        )}
      </span>
    </div>
  );
};

export default NowPlaying;
