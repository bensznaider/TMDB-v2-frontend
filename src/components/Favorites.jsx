import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../commons/MovieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getFavorites } from "../state/thunks/favoritesThunk";

const Favorites = () => {
  const dispatch = useDispatch();

  const deviceWidth = window.innerWidth;

  const loggedUser = useSelector((state) => state.loggedUser);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const setFavFunction = async () => {
      try {
        const favs = await dispatch(getFavorites(loggedUser.userId));
        setFavorites(favs.data);
      } catch (error) {
        throw error;
      }
    };
    setFavFunction();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < favorites.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      className="signup-home"
      style={{ padding: "0.5rem", marginBottom: "1rem" }}
    >
      <div>Favorites</div>
      <div
        style={{
          height: "2px",
          margin: "auto",
          marginBottom: favorites.length <= 0 ? "1rem" : "0",
          width: "30%",
          backgroundColor: "#b6c2d9",
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
          <IoIosArrowBack style={{ opacity: "0%" }} />
        )}

        {favorites.length > 0 ? (
          <>
            {deviceWidth <= 600 && (
              <MovieCard
                movie={{
                  id: favorites[activeIndex].tmdbId,
                  original_title: favorites[activeIndex].title,
                  release_date: favorites[activeIndex].year.toString(),
                  poster_path: favorites[activeIndex].posterURL,
                }}
              />
            )}
            {deviceWidth > 600 && deviceWidth <= 800 && (
              <>
                <MovieCard
                  movie={{
                    id: favorites[activeIndex].tmdbId,
                    original_title: favorites[activeIndex].title,
                    release_date: favorites[activeIndex].year.toString(),
                    poster_path: favorites[activeIndex].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 1].tmdbId,
                    original_title: favorites[activeIndex + 1].title,
                    release_date: favorites[activeIndex + 1].year.toString(),
                    poster_path: favorites[activeIndex + 1].posterURL,
                  }}
                />
              </>
            )}
            {deviceWidth > 800 && deviceWidth <= 1000 && (
              <>
                <MovieCard
                  movie={{
                    id: favorites[activeIndex].tmdbId,
                    original_title: favorites[activeIndex].title,
                    release_date: favorites[activeIndex].year.toString(),
                    poster_path: favorites[activeIndex].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 1].tmdbId,
                    original_title: favorites[activeIndex + 1].title,
                    release_date: favorites[activeIndex + 1].year.toString(),
                    poster_path: favorites[activeIndex + 1].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 2].tmdbId,
                    original_title: favorites[activeIndex + 2].title,
                    release_date: favorites[activeIndex + 2].year.toString(),
                    poster_path: favorites[activeIndex + 2].posterURL,
                  }}
                />
              </>
            )}
            {deviceWidth > 1000 && deviceWidth <= 1200 && (
              <>
                <MovieCard
                  movie={{
                    id: favorites[activeIndex].tmdbId,
                    original_title: favorites[activeIndex].title,
                    release_date: favorites[activeIndex].year.toString(),
                    poster_path: favorites[activeIndex].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 1].tmdbId,
                    original_title: favorites[activeIndex + 1].title,
                    release_date: favorites[activeIndex + 1].year.toString(),
                    poster_path: favorites[activeIndex + 1].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 2].tmdbId,
                    original_title: favorites[activeIndex + 2].title,
                    release_date: favorites[activeIndex + 2].year.toString(),
                    poster_path: favorites[activeIndex + 2].posterURL,
                  }}
                />
                <MovieCard
                  movie={{
                    id: favorites[activeIndex + 3].tmdbId,
                    original_title: favorites[activeIndex + 3].title,
                    release_date: favorites[activeIndex + 3].year.toString(),
                    poster_path: favorites[activeIndex + 3].posterURL,
                  }}
                />
              </>
            )}
            {deviceWidth > 1200 && (
              <>
                <MovieCard
                  movie={{
                    id: favorites[activeIndex].tmdbId,
                    original_title: favorites[activeIndex].title,
                    release_date: favorites[activeIndex].year.toString(),
                    poster_path: favorites[activeIndex].posterURL,
                  }}
                />
                {favorites[activeIndex + 1] ? (
                  <MovieCard
                    movie={{
                      id: favorites[activeIndex + 1].tmdbId,
                      original_title: favorites[activeIndex + 1].title,
                      release_date: favorites[activeIndex + 1].year.toString(),
                      poster_path: favorites[activeIndex + 1].posterURL,
                    }}
                  />
                ) : (
                  <></>
                )}
                {favorites[activeIndex + 2] ? (
                  <MovieCard
                    movie={{
                      id: favorites[activeIndex + 2].tmdbId,
                      original_title: favorites[activeIndex + 2].title,
                      release_date: favorites[activeIndex + 2].year.toString(),
                      poster_path: favorites[activeIndex + 2].posterURL,
                    }}
                  />
                ) : (
                  <></>
                )}
                {favorites[activeIndex + 3] ? (
                  <MovieCard
                    movie={{
                      id: favorites[activeIndex + 3].tmdbId,
                      original_title: favorites[activeIndex + 3].title,
                      release_date: favorites[activeIndex + 3].year.toString(),
                      poster_path: favorites[activeIndex + 3].posterURL,
                    }}
                  />
                ) : (
                  <></>
                )}
                {favorites[activeIndex + 4] ? (
                  <MovieCard
                    movie={{
                      id: favorites[activeIndex + 4].tmdbId,
                      original_title: favorites[activeIndex + 4].title,
                      release_date: favorites[activeIndex + 4].year.toString(),
                      poster_path: favorites[activeIndex + 4].posterURL,
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        ) : (
          <span
            style={{
              height: "12rem",
              width: "8rem",
              marginBottom: "1rem",
              borderRadius: "0 3rem 0",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#b6c2d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Select your favorite movies.
          </span>
        )}
         {deviceWidth <= 600 && activeIndex < favorites.length - 1 && (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        )}
        {deviceWidth > 600 &&
          deviceWidth <= 800 &&
          activeIndex < favorites.length - 2 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 800 &&
          deviceWidth <= 1000 &&
          activeIndex < favorites.length - 3 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 1000 &&
          deviceWidth <= 1200 &&
          activeIndex < favorites.length - 4 && (
            <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
          )}
        {deviceWidth > 1200 && activeIndex < favorites.length - 5 && (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        )}
      </span>
    </div>
  );
};

export default Favorites;
