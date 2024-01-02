import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Cart = ({ loggedInUserId }) => {
  const [cart, setCart] = useState({
    items: [
      {
        product_id: -1,
        prod_name: "",
        description: "",
        price: 0,
        sale_price: null,
        discount: null,
        quantity: 0,
        total_price: 0,
        image_url: "",
      },
    ],
    allTotalPrice: 0,
  });
  const [isDeleteFinished, setIsDeleteFinished] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cart/${loggedInUserId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setCart(data);
        setIsDeleteFinished(false);
      })
      .catch((err) => console.log(err));
  }, [loggedInUserId, isDeleteFinished]);

  const handleDelete = (e) => {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    axios
      .delete(
        `http://localhost:3001/cart/${loggedInUserId}/${cart.items[index].product_id}`
      )
      .then((res) => {
        console.log(res.data);
        setIsDeleteFinished(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="cart-container">
      <section className="container grid">
        {cart.items.length > 0 ? (
          <>
            <h1 className="fs-900 ff-display fw-400 margin-bottom">
              Your shopping cart
            </h1>
            <div className="cart align-center margin-bottom">
              <div></div>
              <div className="title-1">Products</div>
              <div className="title-2 self-end">Quantity</div>
              <div className="title-3 self-end">Total (each)</div>
              {cart.items.map((cartItem, i) => (
                <Fragment key={i}>
                  <button
                    data-index={i}
                    onClick={handleDelete}
                    className="delete-btn width-fit-content"
                  >
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
                  </button>
                  <div className="product-details flex align-start">
                    <img src={cartItem.image_url} alt={cartItem.prod_name} />
                    <div className="info grid" style={{ "--gap": "0.4rem" }}>
                      <h3 className="fs-500 ff-display fw-400">
                        {cartItem.prod_name}
                      </h3>
                      <div className="description fs-300">
                        {cartItem.description.slice(
                          0,
                          cartItem.description.length >= 40
                            ? 40
                            : cartItem.description.length
                        )}
                      </div>
                      <span className="price price--product price--cart">
                        <span className="fs-400 discount-price">
                          {cartItem.sale_price && `$${cartItem.sale_price}`}
                          <span className="discount">
                            {cartItem.discount && `${cartItem.discount}%`}
                          </span>
                        </span>
                        <span className="fs-400 original-price">
                          ${cartItem.price}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="quantity self-end">{cartItem.quantity}</div>
                  <div className="total-price self-end">
                    ${cartItem.total_price}
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="self-end grid" style={{ "--gap": "0.8rem" }}>
              <div className="flex align-center justify-flex-end">
                <div className="fs-600 ff-display text-primary">Total</div>
                <div className="fs-700 ff-display text-dark-primary">
                  ${cart.allTotalPrice}
                </div>
              </div>
              <p className="fs-300 text-primary self-end">
                Shipping is free of cost!
              </p>
              <Link
                to={`/checkout/${loggedInUserId}`}
                className="btn bg-dark-primary text-white"
              >
                Go to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="empty-cart grid">
            <h1 className="fs-900 ff-display fw-400 margin-bottom text-align-center">
              Your shopping cart is empty
            </h1>
            <img
              className="self-center"
              src="/src/assets/product-listings-assets/box-open-solid.svg"
              alt=""
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;

Cart.propTypes = {
  loggedInUserId: PropTypes.number,
};
