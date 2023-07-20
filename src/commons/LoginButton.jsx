import { useNavigate } from "react-router";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <button className="buttons" onClick={handleLoginClick}>
      LOGIN
    </button>
  );
};

export default LoginButton;
