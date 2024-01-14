import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Wishlist = ({ averageRating }) => {
  const loggedInUserId = useParams().userId;
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const handleDelete = (event) => {
    const index = parseInt(event.currentTarget.dataset.index);
    axios
      .delete(
        `http://localhost:3001/wishlist/${loggedInUserId}/${wishlistProducts[index].product_id}`
      )
      .then((res) => {
        console.log(res.data);
        setRefresh((x) => x + 1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/wishlist/${loggedInUserId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setWishlistProducts(data);
      })
      .catch((err) => console.log(err));
  }, [loggedInUserId, refresh]);
  return (
    <main className="wishlist-container">
      <section className="container">
        {wishlistProducts.length ? (
          <>
            <h1 className="fs-900 fw-400 ff-display margin-bottom">
              Your wishlist
            </h1>
            <div className="wishlist grid auto-fit">
              {wishlistProducts.map((product, i, arrProducts) => (
                <div
                  key={i}
                  className="grid wishlist-item-container width-fit-content"
                  style={{ "--gap": 0 }}
                >
                  <button
                    data-index={i}
                    onClick={handleDelete}
                    className="delete-btn-wishlist delete-btn width-fit-content"
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
                  <Link
                    to={`/products/${product.product_id}`}
                    className={`product wishlist-item grid${
                      arrProducts.length < 5 ? " first-line" : ""
                    }`}
                    style={{ "--gap": "0.75rem" }}
                    key={i}
                  >
                    <img
                      src={product.image_url}
                      alt={product.prod_name}
                      className="margin-bottom"
                      style={{ "--mb": "0.5rem" }}
                    />
                    <div className="fs-600 ff-display flex space-between align-center">
                      <div className="product-name">{product.prod_name}</div>
                      <div
                        className="rating fs-400 ff-normal flex align-center"
                        style={{ "--gap": "0.2rem" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="18"
                          viewBox="0 0 576 512"
                        >
                          <path
                            opacity="1"
                            fill="var(--clr-primary)"
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                          />
                        </svg>
                        {averageRating[product.product_id] ?? 0}
                      </div>
                    </div>
                    <span className="price">
                      <span className="fs-500 discount-price">
                        {product.sale_price ? `$${product.sale_price}` : ""}
                        <span className="discount">
                          {product.sale_price
                            ? `${Math.round(
                                ((product.price - product.sale_price) /
                                  product.price) *
                                  100
                              )}%`
                            : ""}
                        </span>
                      </span>
                      <span className="fs-500 original-price">
                        ${product.price}
                      </span>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-wishlist grid">
            <h1 className="fs-900 ff-display fw-400 margin-bottom text-align-center">
              Your Wishlist is empty
            </h1>
            <img
              className="self-center"
              src="/src/assets/product-listings-assets/heart-crack-solid.svg"
              alt=""
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;

Wishlist.propTypes = {
  averageRating: PropTypes.object,
};
