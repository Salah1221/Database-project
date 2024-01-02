import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
  const loggedInUserId = useParams().userId;
  const navigator = useNavigate();
  const [userData, setUserData] = useState([
    {
      user_id: -1,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "customer",
    },
  ]);
  const handleClick = async () => {
    localStorage.clear();
    navigator("/login");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${loggedInUserId}`)
      .then((res) => res.data)
      .then((data) => setUserData(data));
  }, [loggedInUserId]);
  return (
    <main className="user-page">
      <section className="container container--user grid justify-center">
        <div className="flex align-center">
          <img src="/src/assets/home/User--avatar.svg" alt="user avatar" />
          <h1 className="fs-900 ff-display fw-400">
            {userData[0].first_name} {userData[0].last_name}
          </h1>
        </div>
        <div className="grid" style={{ "--gap": "0.5rem" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input border-none"
            value={userData[0].email}
            disabled
          />
        </div>
        <div className="grid" style={{ "--gap": "0.5rem" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input border-none margin-bottom"
            value={userData[0].password}
            disabled
          />
        </div>
        <button
          onClick={handleClick}
          className="btn bg-dark-primary text-white"
        >
          Log out
        </button>
      </section>
    </main>
  );
};

export default User;
