import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";

const Home = () => {

  return (
    <div style={{ textAlign: "center" }}>
      <Welcome />
      <SignUp />
    </div>
  );
};

export default Home;
