import { useState } from "react";
import SignUpButton from "../commons/SignUpButton";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleOnChangeUser = (event) => {
    event.preventDefault()
    setUserName(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    event.preventDefault()
    setEmail(event.target.value);
  };

  const handleSignUpForm = () => {
    setSignUpForm(true);
  };

  const handleSignUpRequest = () => {
  };

  return (
    <div className="signup-home" style={{ marginBottom: "1rem" }}>
      <div style={{ margin: "1rem", fontSize: "large" }}>Come join us!</div>
      {!signUpForm ? (
        <span onClick={handleSignUpForm}>
          <SignUpButton signUpMenuDisplayed={false}/>
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
            style={{margin: "1.5rem"}}
          />
          <SignUpButton signUpMenuDisplayed={true}/>
        </form>
      )}
    </div>
  );
};

export default SignUp;
