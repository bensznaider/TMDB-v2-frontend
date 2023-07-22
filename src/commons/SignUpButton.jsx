import { useNavigate } from "react-router";

const SignUpButton = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <button className="buttons signup-button" onClick={handleSignUpClick}>
      SIGN UP
    </button>
  );
};

export default SignUpButton;
