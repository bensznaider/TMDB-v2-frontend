import { useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../commons/MovieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NowPlaying = () => {
  const nowPlaying = useSelector((state) => {
    return state.movies.nowPlaying;
  });

  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div>
      <div>Now Playing</div>
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