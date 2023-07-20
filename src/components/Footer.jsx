import { useSelector } from "react-redux";

const Footer = () => {
  const isMobileDevice = useSelector((state) => state.isMobile);

  return (
    <>
      <div className="footer">© Ben Sznaider 2023</div>
    </>
  );
};

export default Footer;