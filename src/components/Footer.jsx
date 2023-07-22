import { useSelector } from "react-redux";

const Footer = ({ isMenuOpen }) => {
  const isMobileDevice = useSelector((state) => state.isMobile);

  return (
    <>
      <div className={`footer ${isMenuOpen ? 'blur' : ''}`}>© Ben Sznaider 2023</div>
    </>
  );
};

export default Footer;