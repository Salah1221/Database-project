import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const Signin = ({ setLoggedInUserId }) => {
  const navigator = useNavigate();
  const [identicalPassword, setIdenticalPassword] = useState("");
  const [areEmpty, setAreEmpty] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "rePassword") {
      if (e.target.value === userData.password) setIdenticalPassword("yes");
      else if (userData.password) setIdenticalPassword("no");
      else setIdenticalPassword("");
    }
  };
  const handleClick = () => {
    const emptyFields = Object.values(userData).filter((value) => value === "");
    if (emptyFields.length > 0) setAreEmpty(true);
    else setAreEmpty(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.values(userData).filter((value) => value === "");
    if (emptyFields.length > 0) {
      return;
    }
    axios
      .post("http://localhost:3001/signin", userData)
      .then((res) => res.data)
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("id", data.id);
        setUserData(data);
        setLoggedInUserId(data.id);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(userData);
  };
  return (
    <>
      <header className="signin-heading">
        <h1 className="fs-900 ff-display text-align-center fw-400">Avion</h1>
        <p className="fs-300 text-align-center">
          Sign in here to create your account
        </p>
      </header>
      <main className="signin">
        {areEmpty && (
          <span className="empty fw-700">Please fill out the empty fields</span>
        )}
        <form onSubmit={handleSubmit} className="grid">
          <div className="name-container flex">
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                className="input border-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                className="input border-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="email-container grid" style={{ "--gap": "0.5rem" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input border-none"
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="password-containers grid"
            style={{ "--gap": "0.5rem" }}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input border-none"
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="reenter-password-containers grid margin-bottom"
            style={{ "--gap": "0.5rem", "--mb": "1rem" }}
          >
            <label htmlFor="re-password">Re-enter Password</label>
            <div className="rePassword-input-container">
              <input
                type="password"
                name="rePassword"
                id="re-password"
                className="input border-none"
                onChange={handleChange}
                required
              />
              <span className={identicalPassword}>
                {identicalPassword === "yes" ? (
                  <svg
                    fill="none"
                    viewBox="20 20 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28 39.92 36.08 48l16-16"
                      stroke="#fff"
                      strokeWidth="5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="12"
                    viewBox="0 0 384 512"
                  >
                    <path
                      opacity="1"
                      fill="#fff"
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <input
            type="submit"
            value="Sign in"
            className="btn bg-dark-primary text-white"
            onClick={handleClick}
          />
          <p className="text-align-center">
            Already have an account? You can login in{" "}
            <Link className="text-primary" to={"/login"}>
              here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Signin;

Signin.propTypes = {
  setLoggedInUserId: PropTypes.func.isRequired,
  loggedInUserId: PropTypes.number,
};
