import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import countries from "./countries";

const Checkout = ({ loggedInUserId }) => {
  const ref = useRef();
  const navgiator = useNavigate();
  const [cartItems, setCartItems] = useState({
    items: [],
    allTotalPrice: 0,
  });
  const [paymentAndShipping, setPaymentAndShipping] = useState({
    paymentMethod: "cash",
    country: "Lebanon",
    city: "",
    address: "",
  });

  const [areEmpty, setAreEmpty] = useState(false);

  const handlePurchase = () => {
    axios
      .post(`http://localhost:3001/checkout/${loggedInUserId}`, {
        address: `${paymentAndShipping.address}, ${paymentAndShipping.city}, ${paymentAndShipping.country}`,
        orderTotal: cartItems.allTotalPrice,
        paymentMethod: paymentAndShipping.paymentMethod,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        // insert into order_details from the cart
        axios
          .post(
            `http://localhost:3001/checkout/${loggedInUserId}/${data.order_id}`,
            {
              cartItems: cartItems.items,
            }
          )
          .then((res) => {
            console.log(res.data);
            // delete the cart
            axios
              .delete(`http://localhost:3001/cart/${loggedInUserId}`)
              .then((res) => {
                console.log(res.data);
                ref.current.close();
                navgiator("/");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setAreEmpty(false);
    setPaymentAndShipping({
      ...paymentAndShipping,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (paymentAndShipping.city && paymentAndShipping.address) {
      ref.current.showModal();
      setAreEmpty(false);
    } else {
      setAreEmpty(true);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cart/${loggedInUserId}`)
      .then((res) => res.data)
      .then((data) => {
        setCartItems(data);
      })
      .catch((err) => console.log(err));
  }, [loggedInUserId]);
  return (
    <>
      <dialog ref={ref} className="checkout bg-white">
        <div className="flex align-center justify-center margin-bottom">
          <p className="fs-600 ff-display text-align-center">
            Confirm purchase?
          </p>
        </div>
        <div className="flex space-between">
          <button
            className="btn bg-dark-primary text-white"
            onClick={handlePurchase}
          >
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
      <header className="checkout-heading">
        <Link
          to={`/cart/${loggedInUserId}`}
          className="grid align-center bg-white text-dark-primary"
        >
          ⮜ Return to Cart
        </Link>
        <h1 className="fs-800 self-center">
          <span className="fs-900 ff-display fw-400">Avion</span> Checkout
        </h1>
      </header>
      <main>
        {areEmpty && (
          <div className="flex align-center justify-center">
            <p className="empty-checkout fs-600 empty ff-display text-align-center">
              Please fill in all the fields
            </p>
          </div>
        )}
        <section className="container container--checkout flex justify-center align-start">
          <form className="grid align-start width-fit-content">
            <h2 className="fs-600 ff-display fw-400">Payment</h2>
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="payment-method">Payment Method</label>
              <select
                className="input border-none"
                name="payment-method"
                id="payment-method"
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="credit-card">PayPal</option>
              </select>
            </div>
            <h2 className="fs-600 ff-display fw-400">Shipping Address</h2>
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="country">Country</label>
              <select
                className="input border-none"
                name="country"
                id="country"
                onChange={handleChange}
                defaultValue={"Lebanon"}
              >
                {countries.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="input border-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid" style={{ "--gap": "0.5rem" }}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="input border-none"
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <div className="cart-info bg-dark-primary text-white">
            <h2 className="fs-800 ff-display fw-400">Order Details</h2>
            {cartItems.items.map((item, i) => (
              <div key={i} className="product-info flex space-between">
                <div className="product-name flex">
                  {item.prod_name} <span>&#10005; {item.quantity}</span>
                </div>
                <div className="total-price-product">${item.total_price}</div>
              </div>
            ))}
            <div className="total-price flex space-between ff-display">
              <span className="fs-600">Total</span>
              <span className="fs-700">${cartItems.allTotalPrice}</span>
            </div>
            <button
              className="btn bg-white text-dark-primary"
              type="submit"
              onClick={handleClick}
            >
              Purchase
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Checkout;

Checkout.propTypes = {
  loggedInUserId: PropTypes.number,
};
