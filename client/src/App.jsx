import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductListings from "./ProductListings";
import Product from "./Product";
import ReviewProduct from "./ReviewProduct";
import Cart from "./Cart";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/products/:productId/review" element={<ReviewProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
