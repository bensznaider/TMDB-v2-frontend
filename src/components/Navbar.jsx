import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Spin as Hamburger } from "hamburger-react";
import NavbarMenuDesktop from "./Desktop/NavbarMenu";
import LoginButton from "../commons/LoginButton";

const Navbar = () => {
  const isMobileDevice = useSelector((state) => state.isMobile);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <h1 id="logo" onClick={handleLogoClick}>
          TMDB
        </h1>
        {isMobileDevice ? (
          <Hamburger toggled={isOpen} toggle={setOpen} />
        ) : (
          <NavbarMenuDesktop />
        )}
      </div>
      {isMobileDevice && isOpen ? (
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
          <span onClick={handleLoginClick}>
            <LoginButton />
          </span>
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
