import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const Login = ({ setLoggedInUserId }) => {
  const navigator = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    axios
      .post("http://localhost:3001/login", userData)
      .then((res) => res.data)
      .then((data) => {
        setInvalidCredentials(false);
        console.log(data);
        localStorage.setItem("id", data.id);
        setLoggedInUserId(data.id);
        if (data.id) navigator("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setInvalidCredentials(true);
        } else {
          console.error(error);
        }
      });
  };
  return (
    <>
      <header className="login-heading">
        <h1 className="fs-900 ff-display text-align-center fw-400">Avion</h1>
        <p className="fs-300 text-align-center">
          Welcome back! Please login to your account.
        </p>
      </header>
      <main className="login">
        <form onSubmit={handleSubmit} className="grid">
          {invalidCredentials && (
            <span className="fs-300 fw-700 empty text-align-center">
              Invalid email or password
            </span>
          )}
          <div className="email-container grid" style={{ "--gap": "0.5rem" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input border-none"
              required
              onChange={handleChange}
            />
          </div>
          <div
            className="password-containers grid margin-bottom"
            style={{ "--gap": "0.5rem", "--mb": "1rem" }}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input border-none"
              required
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Log in"
            className="btn bg-dark-primary text-white"
          />
          <p>
            Don&apos;t have an account? You can sign in{" "}
            <Link className="text-primary" to={"/signin"}>
              here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;

Login.propTypes = {
  loggedInUserId: PropTypes.number,
  setLoggedInUserId: PropTypes.func.isRequired,
};
