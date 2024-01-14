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
import Wishlist from "./Wishlist";
import ProductsDashboard from "./ProductsDashboard";
import NavDashboard from "./NavDashboard";
import AddProduct from "./AddProduct";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Reviews from "./Reviews";
import Users from "./Users";

function App() {
  const [search, setSearch] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [averageRating, setAverageRating] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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
    } else if (!loggedInUserId && location.pathname !== "/signin")
      navigate("/login");
  }, [loggedInUserId, navigate, location.pathname]);
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
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${loggedInUserId}`)
      .then((res) => res.data)
      .then((data) => {
        setIsAdmin(data.role === "admin");
      });
  }, [loggedInUserId]);

  return (
    <div className="app">
      {!isInSignInPage &&
        (!isAdmin ? (
          <Nav setSearch={setSearch} loggedInUserId={loggedInUserId} />
        ) : (
          <NavDashboard loggedInUserId={loggedInUserId} />
        ))}
      <Routes>
        {!isAdmin ? (
          <>
            <Route path="/" element={<Home averageRating={averageRating} />} />
            <Route
              path="/products"
              element={
                <ProductListings
                  search={search}
                  averageRating={averageRating}
                />
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
            <Route path="/cart/:userId" element={<Cart />} />
            <Route path="/checkout/:userId" element={<Checkout />} />
            <Route
              path="/wishlist/:userId"
              element={<Wishlist averageRating={averageRating} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<ProductsDashboard />} />
            <Route path="/add-product/" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/users" element={<Users />} />
          </>
        )}
        <Route path="/user/:userId" element={<User />} />
        <Route
          path="/login"
          element={
            <Login
              setLoggedInUserId={setLoggedInUserId}
              setIsAdmin={setIsAdmin}
            />
          }
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
      </Routes>
      {!isInSignInPage && <Footer />}
    </div>
  );
}

export default App;
