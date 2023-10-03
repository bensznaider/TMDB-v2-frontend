import { useState } from "react";
import SignUpButton from "../commons/SignUpButton";
import { createUser } from "../state/thunks/usersThunk";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  const deviceWidth = window.innerWidth;

  const [signUpForm, setSignUpForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [correctSignUp, setCorrectSignUp] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSignUpForm = () => {
    setSignUpForm(true);
  };

  const handleSignUpRequest = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setCorrectSignUp(null);
    const user = { email: email, password: password };
    try {
      const response = await dispatch(createUser(user));
      if (response.status === 200) {
        setCorrectSignUp(true);
        document.getElementById("result-message").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setCorrectSignUp(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error during signup: ", error);
      setErrorMessage(error.response.data);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      document.getElementById("result-message").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="signup-home" style={{ marginBottom: "1rem" }}>
      <div style={{ margin: "1rem", fontSize: "large" }}>Join us.</div>
      {!signUpForm ? (
        <span onClick={handleSignUpForm}>
          <SignUpButton signUpMenuDisplayed={false} />
        </span>
      ) : (
        <form
          onSubmit={handleSignUpRequest}
          style={{
            width: `${deviceWidth <= 850 ? "70%" : "40%"}`,
            margin: "auto",
          }}
        >
          <input
            className="welcome-search"
            type="email"
            value={email}
            onChange={handleOnChangeEmail}
            placeholder="EMAIL: example@example.com"
            style={{ marginBottom: "1.5rem" }}
          />
          <input
            className="welcome-search"
            type="password"
            value={password}
            onChange={handleOnChangePassword}
            placeholder="PASSWORD"
            style={{
              marginBottom: "1.5rem",
              marginLeft: `${deviceWidth <= 850 ? 0 : "1.5rem"}`,
            }}
          />
          <SignUpButton signUpMenuDisplayed={true} />
        </form>
      )}
      <span id="result-message">
        {correctSignUp ? (
          <div style={{ margin: "1rem", fontSize: "large" }}>
            User succesfully created, please log in.
          </div>
        ) : (
          <></>
        )}
        {errorMessage ? (
          <div style={{ margin: "1rem", fontSize: "large" }}>
            {errorMessage}
          </div>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
};

export default SignUp;
