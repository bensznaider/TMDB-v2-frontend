import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./state/slices/isMobileSlice";
import { fetchNowPlaying, fetchTopRated } from "./state/thunks/moviesThunk";
import { Routes, Route } from "react-router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsMobile(window.matchMedia("(max-width: 600px)").matches));
    dispatch(fetchNowPlaying())
    dispatch(fetchTopRated())
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/signup"
          element={<h1 style={{ marginTop: "6rem" }}>SIGN UP</h1>}
        ></Route>
        <Route
          path="/login"
          element={<h1 style={{ marginTop: "6rem" }}>LOGIN</h1>}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
