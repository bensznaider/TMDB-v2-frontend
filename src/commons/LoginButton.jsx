import { IoIosArrowDown } from "react-icons/io";

const LoginButton = ({ loginMenuDisplayed }) => {
  return (
    <button
      className={`${!loginMenuDisplayed ? 'buttons signup-home' : 'buttons'}`}
      style={{ borderColor: "white", paddingTop: "1rem" }}
    >
      LOGIN
      {!loginMenuDisplayed ? <IoIosArrowDown style={{ marginLeft: "5px" }} /> : <></>}
    </button>
  );
};

export default LoginButton;
