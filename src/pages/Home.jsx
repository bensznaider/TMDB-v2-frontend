import { useState } from "react";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";
import TopRated from "../components/TopRated"
import NowPlaying from "../components/NowPlaying";
import SearchResults from "../components/SearchResults";

const Home = ({ isMenuOpen }) => {
  const [searchClickedOn, setSearchClickedOn] = useState(false)

  const toggleSearch = () => {
    setSearchClickedOn(true)
  }

  return (
    <div className={`${isMenuOpen ? 'blur' : ''}`} style={{ textAlign: "center" }}>
      <Welcome toggleSearch={toggleSearch}/>
      {searchClickedOn ? <SearchResults /> : <></>}
      <SignUp />
      <TopRated />
      <NowPlaying />
    </div>
  );
};

export default Home;
