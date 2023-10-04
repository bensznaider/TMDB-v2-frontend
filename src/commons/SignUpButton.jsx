import { IoIosArrowDown } from "react-icons/io";

const SignUpButton = ({ signUpMenuDisplayed }) => {
  return (
    <button
      className={`${!signUpMenuDisplayed ? 'buttons signup-home' : 'buttons'}`}
      style={{ borderColor: "white", padding: 0 }}
    >
      SIGN UP
      {!signUpMenuDisplayed ? <IoIosArrowDown style={{ marginLeft: "5px" }} /> : <></>}
    </button>
  );
};

export default SignUpButton;
