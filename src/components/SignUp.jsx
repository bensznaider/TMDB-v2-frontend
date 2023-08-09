import { useState } from "react";
import SignUpButton from "../commons/SignUpButton";
import { createUser } from "../state/thunks/usersThunk";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [signUpForm, setSignUpForm] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [correctSignUp, setCorrectSignUp] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChangeUser = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

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
    const user = { username: userName, email: email, password: password };
    try {
      const response = await dispatch(createUser(user));
      if (response.status === 200) {
        setCorrectSignUp(true);
        document.getElementById("result-message").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setUserName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during sign up: ", error);
      setErrorMessage(error.response.data);
      document.getElementById("result-message").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="signup-home" style={{ marginBottom: "1rem" }}>
      <div style={{ margin: "1rem", fontSize: "large" }}>Come join us!</div>
      {!signUpForm ? (
        <span onClick={handleSignUpForm}>
          <SignUpButton signUpMenuDisplayed={false} />
        </span>
      ) : (
        <form onSubmit={handleSignUpRequest}>
          <input
            className="welcome-search"
            type="text"
            value={userName}
            onChange={handleOnChangeUser}
            placeholder="USERNAME"
          />
          <input
            className="welcome-search"
            type="text"
            value={email}
            onChange={handleOnChangeEmail}
            placeholder="EMAIL: example@example.com"
            style={{ margin: "1.5rem" }}
          />
          <input
            className="welcome-search"
            type="password"
            value={password}
            onChange={handleOnChangePassword}
            placeholder="PASSWORD"
            style={{ marginBottom: "1.5rem" }}
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
          <div
            //ref={errorMessageRef} // Attach the ref to the error message element
            style={{ margin: "1rem", fontSize: "large" }}
          >
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
