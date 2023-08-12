import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../../commons/LoginButton";
import LogoutButton from "../../commons/LogoutButton";
import { loginUser } from "../../state/thunks/usersThunk";
import { setLoggedUser } from "../../state/slices/userSlice";

const NavbarMenuMobile = ({ isOpen }) => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);

  const [loginForm, setLoginForm] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleOnChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleLoginForm = () => {
    setLoginForm(true);
  };

  const handleLogoutForm = () => {
    console.log("LOGOUT LLEGÓ")
  };

  const handleLoginRequest = async (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    try {
      const response = await dispatch(loginUser(user));
      dispatch(setLoggedUser({userId: response.data.userId, email: user.email}))
    } catch (error) {
      console.error("Error during login: ", error);
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <>
      {isOpen && !loginForm && !loggedUser? (
        <span className="navbar-menu">
          <span
            style={{
              paddingBottom: "1rem",
              textAlign: "center",
              fontSize: "large",
            }}
          >
            Guest
          </span>
          <span onClick={handleLoginForm}>
            <LoginButton loginMenuDisplayed={false} />
          </span>
        </span>
      ) : (
        <></>
      )}
       {isOpen && !loginForm && loggedUser? (
        <span className="navbar-menu">
          <span
            style={{
              paddingBottom: "1rem",
              textAlign: "center",
              fontSize: "large",
            }}
          >
            {loggedUser.email}
          </span>
          <span onClick={handleLogoutForm}>
            <LogoutButton />
          </span>
        </span>
      ) : (
        <></>
      )}
      {isOpen && loginForm && !loggedUser? (
        <span className="navbar-menu" style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "large",
            }}
          >
            Guest
          </span>
          <form onSubmit={handleLoginRequest}>
            <input
              className="welcome-search"
              type="email"
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
            <LoginButton loginMenuDisplayed={true} />
          </form>
          {errorMessage ? (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              {errorMessage}
            </div>
          ) : (
            <></>
          )}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavbarMenuMobile;
