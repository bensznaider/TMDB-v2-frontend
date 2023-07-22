import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";
import TopRated from "../components/TopRated"
import NowPlaying from "../components/NowPlaying";

const Home = () => {

  return (
    <div style={{ textAlign: "center" }}>
      <Welcome />
      <SignUp />
      <TopRated />
      <NowPlaying />
    </div>
  );
};

export default Home;
