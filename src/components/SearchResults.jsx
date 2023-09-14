import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByString } from "../state/thunks/moviesThunk";
import MovieCard from "../commons/MovieCard";
import {
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosRemoveCircle,
} from "react-icons/io";

const SearchResults = ({ movieString, hadResults }) => {
  const dispatch = useDispatch();

  const results = useSelector((state) => {
    return state.movies.searchResults;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useEffect(() => {
    setPageIndex(1);
    setNoMoreResults(false);
  }, [movieString]);

  const [pageIndex, setPageIndex] = useState(1);

  const handleNext = () => {
    if (activeIndex < results.length - 1) {
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
      dispatch(fetchMoviesByString(movieString, pageIndex - 1));
      setNoMoreResults(false);
      setPageIndex(pageIndex - 1);
      setActiveIndex(0);
    }
  };

  const [noMoreResults, setNoMoreResults] = useState(false);

  const handlePageUp = async () => {
    const pageUpResults = await dispatch(
      fetchMoviesByString(movieString, pageIndex + 1)
    );
    if (pageUpResults.length > 0) {
      setPageIndex(pageIndex + 1);
      setActiveIndex(0);
    } else {
      dispatch(fetchMoviesByString(movieString, pageIndex))
      setNoMoreResults(true);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>Search Results</div>
      <div>
        Page{" "}
        <IoIosRemoveCircle
          onClick={handlePageDown}
          style={{ cursor: "pointer" }}
        />{" "}
        {pageIndex}{" "}
        <IoIosAddCircle onClick={handlePageUp} style={{ cursor: "pointer" }} />
      </div>
      {noMoreResults && <div>Your search had no more results.</div>}
      {!hadResults && <div>Your search had no results.</div>}
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

        {results ? (
          <MovieCard movie={results[activeIndex]} />
        ) : (
          <span>LOADING...</span>
        )}
        {activeIndex < results.length - 1 ? (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        ) : (
          <IoIosArrowForward color={"#b6c2d9"} />
        )}
      </span>
    </div>
  );
};

export default SearchResults;
