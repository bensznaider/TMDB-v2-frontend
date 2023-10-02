import { useState } from "react";
import { useSelector } from "react-redux";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";
import TopRated from "../components/TopRated"
import NowPlaying from "../components/NowPlaying";
import SearchResults from "../components/SearchResults";
import Favorites from "../components/Favorites";

const Home = ({ isMenuOpen }) => {
  const [searchClickedOn, setSearchClickedOn] = useState(false)
  const [movieSearchString, setMovieSearchString] = useState("")
  const [searchHadResults, setSearchHadResults] = useState(true)

  const loggedUser = useSelector((state) => state.loggedUser);

  const toggleSearch = (movieName, boolean) => {
    setSearchClickedOn(true)
    setMovieSearchString(movieName)
    setSearchHadResults(boolean)
    setTimeout(() => {
      setSearchHadResults(true)
    }, 3000);
  }

  return (
    <div className={`${isMenuOpen ? 'blur' : ''}`} style={{ textAlign: "center", minHeight: "100vh" }}>
      <Welcome toggleSearch={toggleSearch}/>
      {searchClickedOn ? <SearchResults movieString={movieSearchString} hadResults={searchHadResults}/> : <></>}
      {loggedUser.userId ? <Favorites /> : <SignUp />}
      <TopRated />
      <NowPlaying />
    </div>
  );
};

export default Home;
