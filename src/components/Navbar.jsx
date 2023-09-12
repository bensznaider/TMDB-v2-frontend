import { useState } from "react";
import { useNavigate } from "react-router";
import { Spin as Hamburger } from "hamburger-react";
import NavbarMenuDesktop from "./Desktop/NavbarMenu";
import NavbarMenuMobile from "./Mobile/NavbarMenu";

const Navbar = ({ toggleMenu }) => {
  const deviceWidth = window.innerWidth;
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setOpen(!isOpen);
    toggleMenu();
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <h1 id="logo" onClick={handleLogoClick}>
          TMDB
        </h1>
        {deviceWidth <= 850 ? (
          <>
            <Hamburger toggled={isOpen} toggle={handleMenuClick} />
            <NavbarMenuMobile isOpen={isOpen} />
          </>
        ) : (
          <></>
        )}
        {deviceWidth > 850 ? <NavbarMenuDesktop /> : <></>}
      </div>
    </>
  );
};

export default Navbar;
