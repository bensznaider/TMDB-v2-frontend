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

  const loggedUser = useSelector((state) => state.loggedUser);

  const toggleSearch = () => {
    setSearchClickedOn(true)
  }

  return (
    <div className={`${isMenuOpen ? 'blur' : ''}`} style={{ textAlign: "center" }}>
      <Welcome toggleSearch={toggleSearch}/>
      {searchClickedOn ? <SearchResults /> : <></>}
      {loggedUser.userId ? <Favorites /> : <SignUp />}
      <TopRated />
      <NowPlaying />
    </div>
  );
};

export default Home;
