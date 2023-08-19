import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../commons/MovieCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getFavorites } from "../state/thunks/favoritesThunk";

const Favorites = () => {
  const dispatch = useDispatch();

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
    <div className="signup-home" style={{padding: "0.5rem", marginBottom: "1rem"}}>
      <div>Favorites</div>
      <div
        style={{
          height: "2px",
          margin: "auto",
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
          <IoIosArrowBack style={{opacity: "0%"}}/>
        )}

        {favorites.length > 0 ? (
          <MovieCard
            movie={{
              id: favorites[activeIndex].tmdbId,
              original_title: favorites[activeIndex].title,
              release_date: favorites[activeIndex].year.toString(),
              poster_path: favorites[activeIndex].posterURL,
            }}
          />
        ) : (
          <span>LOADING...</span>
        )}
        {activeIndex < favorites.length - 1 ? (
          <IoIosArrowForward onClick={handleNext} cursor={"pointer"} />
        ) : (
          <IoIosArrowForward style={{opacity: "0%"}}/>
        )}
      </span>
    </div>
  );
};

export default Favorites;
