import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNowPlaying, fetchTopRated } from "./state/thunks/moviesThunk";
import { reloadUser } from "./state/thunks/usersThunk";
import { Routes, Route } from "react-router";
import SelectedMovie from "./pages/SelectedMovie";
import { setLoggedUser } from "./state/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNowPlaying(1));
    dispatch(fetchTopRated(1));
  }, []);

  useEffect(() => {
    const userPersistence = async () => {
      try {
        const response = await dispatch(reloadUser())
        dispatch(setLoggedUser({userId: response.data.id, email: response.data.email}))
      }
      catch (error) {
        console.log(error)
      }
    }
    userPersistence()
  }, []);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <Routes>
        <Route path="/" element={<Home isMenuOpen={isMenuOpen} />}></Route>
        <Route
          path="/movie/:movieId"
          element={<SelectedMovie isMenuOpen={isMenuOpen} />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer isMenuOpen={isMenuOpen} />
    </>
  );
}

export default App;
