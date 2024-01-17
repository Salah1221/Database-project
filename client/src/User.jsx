import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
  const loggedInUserId = useParams().userId;
  const navigator = useNavigate();
  const ref = useRef();
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
  const handleConfirmDelete = () => {
    ref.current.showModal();
  };
  const handleDelete = async () => {
    axios
      .delete(`http://localhost:3001/user/${loggedInUserId}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
    <>
      <dialog ref={ref} className="checkout bg-white">
        <div className="flex align-center justify-center margin-bottom">
          <p className="fs-600 ff-display text-align-center">
            Are you sure you want to delete your account
          </p>
        </div>
        <div className="flex space-between">
          <button className="btn bg-danger text-white" onClick={handleDelete}>
            Yes
          </button>
          <button
            className="btn border bg-white text-dark-primary"
            onClick={() => ref.current.close()}
          >
            No
          </button>
        </div>
      </dialog>
      <main className="user-page">
        <section className="container container--user grid justify-center">
          <div className="flex align-center">
            <img src="/src/assets/home/User--avatar.svg" alt="user avatar" />
            <h1 className="fs-900 ff-display fw-400">
              {userData.first_name} {userData.last_name}
            </h1>
            {userData.role === "admin" && (
              <p className="admin-tag fs-500 ff-body text-white bg-primary margin-left">
                Admin
              </p>
            )}
          </div>
          <div className="grid" style={{ "--gap": "0.5rem" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input border-none"
              value={userData.email}
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
              value={userData.password}
              disabled
            />
          </div>
          <button
            onClick={handleClick}
            className="btn bg-dark-primary text-white"
          >
            Log out
          </button>
          <button
            onClick={handleConfirmDelete}
            className="btn bg-danger text-white margin-top"
          >
            Delete account
          </button>
        </section>
      </main>
    </>
  );
};

export default User;
