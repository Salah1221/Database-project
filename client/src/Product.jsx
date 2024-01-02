import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { timeAgo } from "./timeAgo";

const Product = ({ loggedInUserId }) => {
  const navigator = useNavigate();
  const url_params = useParams();
  const ref = useRef(null);

  const [product, setProduct] = useState([
    {
      product_id: -1,
      prod_name: "",
      description: "",
      category_id: -1,
      dimensions: "",
      weight: -1,
      stock: -1,
      price: -1,
      sale_price: null,
      image_url: "",
    },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [ratingsInfo, setRatingInfo] = useState({});
  const [hasBought, setHasBought] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [reviews, setReviews] = useState([
    {
      review_id: -1,
      product_id: url_params.productId,
      customer_id: loggedInUserId,
      rating: 0,
      review_title: "",
      review_text: "",
      review_date: "",
    },
  ]);
  const [top4, setTop4] = useState([]);
  const loggedInUserReview = reviews.find(
    (review) => review.customer_id === loggedInUserId
  );

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3001/review/${loggedInUserId}/${url_params.productId}`
      )
      .then(() => {
        setRefresh((counter) => counter + 1);
        setHasReviewed(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.value < 1 && e.target.value.length > 0) e.target.value = 1;
    setQuantity(e.target.value);
  };
  const handleAddToCart = () => {
    axios
      .post(`http://localhost:3001/cart/${loggedInUserId}`, {
        productId: url_params.productId,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res.status);
        ref.current.showModal();
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/has-user-reviewed-product/${loggedInUserId}/${url_params.productId}`
      )
      .then((res) => res.data)
      .then((data) => {
        setHasReviewed(data.hasReviewed);
      });
  }, [loggedInUserId, url_params.productId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews/${url_params.productId}`)
      .then((res) => res.data)
      .then((data) => {
        setReviews(data);
      });
    axios
      .get(`http://localhost:3001/ratings-info/${url_params.productId}`)
      .then((res) => res.data)
      .then((data) => {
        setRatingInfo(data[0]);
      });
    axios
      .get(`http://localhost:3001/products/${url_params.productId}`)
      .then((res) => res.data)
      .then((data) => setProduct(data));
  }, [url_params.productId, refresh]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products-top4`)
      .then((res) => res.data)
      .then((data) => setTop4(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/has-user-purchased-product/${loggedInUserId}/${url_params.productId}`
      )
      .then((res) => res.data)
      .then((data) => setHasBought(data.hasBought))
      .catch((err) => console.log(err));
  }, [loggedInUserId, url_params.productId]);
  const dimensionsArr = product[0].dimensions.split("x");
  return (
    <>
      <dialog ref={ref} key={Math.random()} className="cart-dialog bg-white">
        <div className="flex align-center justify-center margin-bottom">
          <img
            src="/src/assets/product-listings-assets/box-open-solid.svg"
            alt=""
          />
          <p className="fs-300 text-align-center">
            Added successfully to your cart
          </p>
        </div>
        <div>
          <button
            className="btn bg-dark-primary text-white"
            onClick={() => {
              ref.current.close();
              navigator(`/cart/${loggedInUserId}`);
            }}
          >
            Go to Cart
          </button>
          <button
            onClick={() => ref.current.close()}
            className="btn bg-white text-dark-primary"
          >
            Continue Shopping
          </button>
        </div>
      </dialog>
      <main>
        <div
          className="product-info flex justify-center"
          style={{ "--gap": "0" }}
        >
          <img src={product[0].image_url} alt={product[0].prod_name} />
          <div
            className="info-card bg-white grid"
            style={{ "--gap": "2.5rem" }}
          >
            <div className="grid" style={{ "--gap": "0.8rem" }}>
              <p className="fs-900 ff-display text-dark-primary">
                {product[0].prod_name}
              </p>
              <div
                className="rating-stars"
                style={{ "--rating": ratingsInfo.averageRating ?? 0 }}
              ></div>
              <span className="price price--product">
                <span className="fs-700 discount-price">
                  {product[0].sale_price ? `$${product[0].sale_price}` : ""}
                  <span className="discount">
                    {product[0].sale_price
                      ? `${Math.round(
                          ((product[0].price - product[0].sale_price) /
                            product[0].price) *
                            100
                        )}%`
                      : ""}
                  </span>
                </span>
                <span className="fs-700 original-price">
                  ${product[0].price}
                </span>
              </span>
            </div>
            <div className="description">
              <p
                className="ff-display margin-bottom"
                style={{ "--mb": "1rem" }}
              >
                Description
              </p>
              <p>{product[0].description}</p>
            </div>
            <div className="specs">
              <p
                className="ff-display margin-bottom"
                style={{ "--mb": "1.75rem" }}
              >
                Specifications
              </p>
              <div className="flex">
                <div className="grid" style={{ "--gap": "0.75rem" }}>
                  <span className="fs-300 ff-display">Length</span>
                  <span>{dimensionsArr[0]}cm</span>
                </div>
                <div className="grid" style={{ "--gap": "0.75rem" }}>
                  <span className="fs-300 ff-display">Width</span>
                  <span>{dimensionsArr[1]}cm</span>
                </div>
                <div className="grid" style={{ "--gap": "0.75rem" }}>
                  <span className="fs-300 ff-display">Height</span>
                  <span>{dimensionsArr[2]}cm</span>
                </div>
                <div className="grid" style={{ "--gap": "0.75rem" }}>
                  <span className="fs-300 ff-display">Weight</span>
                  <span>{product[0].weight}kg</span>
                </div>
              </div>
            </div>
            <div className="quantity flex align-center">
              <p className="ff-display" style={{ "--mb": "1rem" }}>
                Quantity:
              </p>
              <input
                type="number"
                className="quantity-input bg-light-gray text-dark-primary text-align-center border-none"
                defaultValue={"1"}
                min={"1"}
                onChange={handleChange}
              />
            </div>
            <div className="btns flex" style={{ "--gap": "1rem" }}>
              <button
                onClick={handleAddToCart}
                className="btn bg-dark-primary text-white width-fit-content"
              >
                Add to cart
              </button>
              <button className="btn bg-light-gray text-dark-primary width-fit-content">
                Add to wishlist
              </button>
            </div>
          </div>
        </div>
        <section className="reviews-section">
          <div className="container grid">
            <p className="fs-900 ff-display margin-bottom">Reviews</p>
            <div className="grid">
              <div className="total-rating flex margin-bottom">
                <div
                  className="large-rating fs-900 fw-700 ff-normal flex align-center"
                  style={{ "--gap": "0.3rem" }}
                >
                  <img
                    src="/src/assets/product-listings-assets/star-solid.svg"
                    alt="star"
                    className="star"
                  />
                  {ratingsInfo.averageRating ?? 0}
                </div>
                <div className="each-star-ratings">
                  <div className="bar-container 5-star grid align-center">
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
                      5
                    </div>
                    <div
                      className="bar"
                      style={{
                        "--rating-count": ratingsInfo.fiveStars
                          ? ratingsInfo.fiveStars / ratingsInfo.totalReviews
                          : 0,
                      }}
                    ></div>
                    <div className="rating-count">
                      ({ratingsInfo.fiveStars ?? 0})
                    </div>
                  </div>
                  <div className="bar-container 4-star flex align-center">
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
                      4
                    </div>
                    <div
                      className="bar"
                      style={{
                        "--rating-count": ratingsInfo.fourStars
                          ? ratingsInfo.fourStars / ratingsInfo.totalReviews
                          : 0,
                      }}
                    ></div>
                    <div className="rating-count">
                      ({ratingsInfo.fourStars ?? 0})
                    </div>
                  </div>
                  <div className="bar-container 3-star flex align-center">
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
                      3
                    </div>
                    <div
                      className="bar"
                      style={{
                        "--rating-count": ratingsInfo.threeStars
                          ? ratingsInfo.threeStars / ratingsInfo.totalReviews
                          : 0,
                      }}
                    ></div>
                    <div className="rating-count">
                      ({ratingsInfo.threeStars ?? 0})
                    </div>
                  </div>
                  <div className="bar-container 2-star flex align-center">
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
                      2
                    </div>
                    <div
                      className="bar"
                      style={{
                        "--rating-count": ratingsInfo.twoStars
                          ? ratingsInfo.twoStars / ratingsInfo.totalReviews
                          : 0,
                      }}
                    ></div>
                    <div className="rating-count">
                      ({ratingsInfo.twoStars ?? 0})
                    </div>
                  </div>
                  <div className="bar-container 1-star flex align-center">
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
                      1
                    </div>
                    <div
                      className="bar"
                      style={{
                        "--rating-count": ratingsInfo.oneStar
                          ? ratingsInfo.oneStar / ratingsInfo.totalReviews
                          : 0,
                      }}
                    ></div>
                    <div className="rating-count">
                      ({ratingsInfo.oneStar ?? 0})
                    </div>
                  </div>
                </div>
              </div>
              {!hasReviewed ? (
                <Link
                  to={
                    hasBought ? `/products/${url_params.productId}/review` : ""
                  }
                  className={
                    "btn bg-primary text-white width-fit-content" +
                    (hasBought ? "" : " disabled")
                  }
                  tabIndex={hasBought ? "" : "-1"}
                >
                  Write a Review
                </Link>
              ) : (
                <span className="fs-300 text-primary">
                  You already reviewed the product. You can edit or delete your
                  review
                </span>
              )}
              {!hasBought ? (
                <span className="fs-300 text-primary">
                  You can&apos;t review this product before purchasing it
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="reviews">
              {loggedInUserReview ? (
                <div className="review grid logged-in-user-review" key={0}>
                  <div className="review-heading flex space-between align-center">
                    <div className="flex align-center">
                      <div
                        className="rating rating--review fs-400 flex align-center text-white bg-primary width-fit-content"
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
                            fill="var(--clr-white)"
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                          />
                        </svg>
                        {loggedInUserReview.rating}
                      </div>
                      <p className="fs-600 fw-700">
                        {loggedInUserReview.review_title}
                      </p>
                    </div>
                    <div
                      className="flex align-center"
                      style={{ "--gap": "0.5rem" }}
                    >
                      <Link
                        to={`/products/${url_params.productId}/review`}
                        className="btn bg-primary text-white width-fit-content"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn delete-review bg-primary text-white width-fit-content"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="review-text">
                    {loggedInUserReview.review_text}
                  </p>
                  <p
                    className="customer fw-700 text-dark-gray flex align-center"
                    style={{ "--gap": "0.5rem" }}
                  >
                    {`You`}
                    <span className="checkmark text-white bg-dark-gray">
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
                    </span>
                    <span className="fw-400 fs-300">Certified Buyer</span>
                    <span className="fw-400 fs-300">|</span>
                    <span className="fw-400 fs-300">
                      {timeAgo(new Date(loggedInUserReview.review_date))}
                    </span>
                    {loggedInUserReview.is_editted ? (
                      <>
                        <span className="fw-400 fs-300">|</span>
                        <span className="fw-400 fs-300">Edited</span>
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ) : (
                ""
              )}
              {reviews.map((review, i) =>
                review.customer_id !== loggedInUserId ? (
                  <div className="review grid" key={i}>
                    <div className="review-heading flex align-center">
                      <div
                        className="rating rating--review fs-400 flex align-center text-white bg-primary width-fit-content"
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
                            fill="var(--clr-white)"
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                          />
                        </svg>
                        {review.rating}
                      </div>
                      <p className="fs-600 fw-700">{review.review_title}</p>
                    </div>
                    <p className="review-text">{review.review_text}</p>
                    <p
                      className="customer fw-700 text-dark-gray flex align-center"
                      style={{ "--gap": "0.5rem" }}
                    >
                      {`${review.first_name} ${review.last_name}`}
                      <span className="checkmark text-white bg-dark-gray">
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
                      </span>
                      <span className="fw-400 fs-300">Certified Buyer</span>
                      <span className="fw-400 fs-300">|</span>
                      <span className="fw-400 fs-300">
                        {timeAgo(new Date(review.review_date))}
                      </span>
                      {review.is_editted ? (
                        <>
                          <span className="fw-400 fs-300">|</span>
                          <span className="fw-400 fs-300">Edited</span>
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </section>
        <section className="view-collection">
          <div className="container grid" style={{ "--gap": "3rem" }}>
            <div className="products grid auto-fit" style={{ "--gap": "1rem" }}>
              {top4.map((prod, i) => (
                <Link
                  to={`/products/${prod.product_id}`}
                  className="product grid"
                  style={{ "--gap": "0.75rem" }}
                  key={i}
                >
                  <img
                    src={prod.image_url}
                    alt={prod.prod_name}
                    className="margin-bottom"
                    style={{ "--mb": "0.5rem" }}
                  />
                  <div className="fs-600 ff-display flex space-between align-center">
                    <div className="product-name">{prod.prod_name}</div>
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
                      4.5
                    </div>
                  </div>
                  <span className="price">
                    <span className="fs-500 discount-price">
                      {prod.sale_price ? `$${prod.sale_price}` : ""}
                      <span className="discount">
                        {prod.sale_price
                          ? `${Math.round(
                              ((prod.price - prod.sale_price) / prod.price) *
                                100
                            )}%`
                          : ""}
                      </span>
                    </span>
                    <span className="fs-500 original-price">${prod.price}</span>
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to={"/products"}
              className="btn bg-light-gray text-dark-primary width-fit-content self-center"
            >
              View collection
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;

Product.propTypes = {
  loggedInUserId: PropTypes.number,
};
