import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
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

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("ENTRÓ AL TOGGLE MENU DE APP JSX")
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar toggleMenu={toggleMenu}/>
      <Routes>
        <Route path="/" element={<Home isMenuOpen={isMenuOpen}/>}></Route>
        <Route
          path="/signup"
          element={<h1 style={{ marginTop: "6rem" }} isMenuOpen={isMenuOpen}>SIGN UP</h1>}
        ></Route>
        <Route
          path="/login"
          element={<h1 style={{ marginTop: "6rem" }} isMenuOpen={isMenuOpen}>LOGIN</h1>}
        ></Route>
      </Routes>
      <Footer isMenuOpen={isMenuOpen}/>
    </>
  );
}

export default App;
