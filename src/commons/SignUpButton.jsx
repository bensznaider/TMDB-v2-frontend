import { IoIosArrowDown } from "react-icons/io";

const SignUpButton = ({ signUpMenuDisplayed }) => {
  return (
    <button
      className={`${!signUpMenuDisplayed ? 'buttons signup-home' : 'buttons'}`}
      style={{ borderColor: "white", paddingTop: "1rem" }}
    >
      SIGN UP
      {!signUpMenuDisplayed ? <IoIosArrowDown style={{ marginLeft: "5px" }} /> : <></>}
    </button>
  );
};

export default SignUpButton;
