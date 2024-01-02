import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProductListings from "./ProductListings";
import Product from "./Product";
import ReviewProduct from "./ReviewProduct";
import Cart from "./Cart";
import Login from "./Login";
import { useEffect, useState } from "react";
import Signin from "./Signin";
import User from "./User";
import Checkout from "./Checkout";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [averageRating, setAverageRating] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isInSignInPage =
    location.pathname === "/login" ||
    location.pathname === "/signin" ||
    location.pathname === `/checkout/${loggedInUserId}`;
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setLoggedInUserId(parseInt(id));
      console.log(loggedInUserId);
    } else if (!loggedInUserId) navigate("/login");
  }, [loggedInUserId]);
  useEffect(() => {
    if (loggedInUserId) {
      axios
        .get(`http://localhost:3001/average-ratings/`)
        .then((res) => res.data)
        .then((data) => {
          setAverageRating(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedInUserId]);
  return (
    <div className="app">
      {!isInSignInPage && (
        <Nav setSearch={setSearch} loggedInUserId={loggedInUserId} />
      )}
      <Routes>
        <Route path="/" element={<Home averageRating={averageRating} />} />
        <Route
          path="/products"
          element={
            <ProductListings search={search} averageRating={averageRating} />
          }
        />
        <Route
          path="/products/:productId"
          element={
            <Product
              loggedInUserId={loggedInUserId}
              averageRating={averageRating}
            />
          }
        />
        <Route
          path="/products/:productId/review"
          element={<ReviewProduct loggedInUserId={loggedInUserId} />}
        />
        <Route
          path="/cart/:userId"
          element={<Cart loggedInUserId={loggedInUserId} />}
        />
        <Route
          path="/login"
          element={<Login setLoggedInUserId={setLoggedInUserId} />}
        />
        <Route
          path="/signin"
          element={
            <Signin
              setLoggedInUserId={setLoggedInUserId}
              loggedInUserId={loggedInUserId}
            />
          }
        />
        <Route
          path="/user/:userId"
          element={<User loggedInUserId={loggedInUserId} />}
        />
        <Route
          path="/checkout/:userId"
          element={<Checkout loggedInUserId={loggedInUserId} />}
        />
      </Routes>
      {!isInSignInPage && <Footer />}
    </div>
  );
}

export default App;
