import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Spin as Hamburger } from "hamburger-react";
import NavbarMenuDesktop from "./Desktop/NavbarMenu";
import LoginButton from "../commons/LoginButton";

const Navbar = ({ toggleMenu }) => {
  const isMobileDevice = useSelector((state) => state.isMobile);
  const [isOpen, setOpen] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleOnChangeUser = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleMenuClick = () => {
    setOpen(!isOpen);
    toggleMenu();
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginForm = () => {
    setLoginForm(true);
  };

  const handleLoginRequest = () => {};

  return (
    <>
      <div className="navbar">
        <h1 id="logo" onClick={handleLogoClick}>
          TMDB
        </h1>
        {isMobileDevice ? (
          <Hamburger toggled={isOpen} toggle={handleMenuClick} />
        ) : (
          <NavbarMenuDesktop />
        )}
      </div>
      {isMobileDevice && isOpen && !loginForm ? (
        <span className="navbar navbar-menu">
          <span
            style={{
              padding: "1rem",
              marginBottom: "0.2rem",
              textAlign: "center",
              fontSize: "large",
            }}
          >
            Guest
          </span>
          <span onClick={handleLoginForm}>
            <LoginButton loginMenuDisplayed={false} />
          </span>
        </span>
      ) : (
        <></>
      )}
      {isMobileDevice && isOpen && loginForm ? (
        <span className="navbar navbar-menu" style={{ textAlign: "center" }}>
          <span
            style={{
              padding: "1rem",
              marginBottom: "0.2rem",
              fontSize: "large",
            }}
          >
            Guest
          </span>
          <form onSubmit={handleLoginRequest}>
            <input
              className="welcome-search"
              type="text"
              value={userName}
              onChange={handleOnChangeUser}
              placeholder="USERNAME"
            />
            <input
              className="welcome-search"
              type="text"
              value={email}
              onChange={handleOnChangeEmail}
              placeholder="EMAIL: example@example.com"
              style={{ margin: "1.5rem" }}
            />
            <LoginButton loginMenuDisplayed={true} />
          </form>
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
