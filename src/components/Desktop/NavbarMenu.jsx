import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../../commons/LoginButton";
import LogoutButton from "../../commons/LogoutButton";
import { login, logout } from "../../state/thunks/usersThunk";
import { setLoggedUser } from "../../state/slices/userSlice";

const NavbarMenuDesktop = () => {

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);

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


  const handleLoginRequest = async (event) => {
    event.preventDefault();
    const user = { email: email, password: password };
    try {
      const response = await dispatch(login(user));
      dispatch(
        setLoggedUser({ userId: response.data.userId, email: user.email })
      );
    } catch (error) {
      console.error("Error during login: ", error);
      setErrorMessage("Incorrect email or password");
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
    }
  };

  const handleLogout = () => {
    dispatch(logout(dispatch));
  };

  return (
    <>
      {loggedUser.userId ? (
        <span className="navbar-menu">
          <span
            style={{
              margin: "1rem",
              fontSize: "large",
            }}
          >
            {loggedUser.email}
          </span>
          <span onClick={handleLogout} style={{margin: "1rem"}}>
            <LogoutButton />
          </span>
        </span>
      ) : (
        <span className="navbar-menu" style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "large",
              margin: "1rem",
            }}
          >
            Guest
          </span>
          <form onSubmit={handleLoginRequest} style={{display: "flex", flexDirection: "row"}}>
            <input
              className="welcome-search"
              type="email"
              value={email}
              onChange={handleOnChangeEmail}
              placeholder="EMAIL"
              style={{ margin: "1rem", width: "10rem" }}
            />
            <input
              className="welcome-search"
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              placeholder="PASSWORD"
              style={{ margin: "1rem", width: "8rem" }}
            />
            <span style={{margin: "1rem"}}>
            <LoginButton loginMenuDisplayed={true} />
            </span>
          </form>
          {errorMessage ? (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              {errorMessage}
            </div>
          ) : (
            <></>
          )}
        </span>
      )}
    </>
  );
};

export default NavbarMenuDesktop;