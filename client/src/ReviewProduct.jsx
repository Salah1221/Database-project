import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const ReviewProduct = ({ loggedInUserId }) => {
  const navigator = useNavigate();
  const productId = useParams().productId;
  const [rating, setRating] = useState(null);
  const [areEmpty, setAreEmpty] = useState(false);
  const [review, setReview] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (rating && review.title && review.description) {
      setAreEmpty(false);
      axios
        .post(`http://localhost:3001/review/${loggedInUserId}/${productId}`, {
          rating,
          title: review.title,
          description: review.description,
        })
        .then((res) => {
          console.log(res.status);
          navigator(`/products/${productId}`);
        })
        .catch((err) => console.log(err));
    } else {
      setAreEmpty(true);
    }
  };

  return (
    <main>
      <section className="container grid">
        <h1 className="fs-900 fw-400 ff-display">Write a Review</h1>
        <p className="ff-display">Rating</p>
        <div
          className="rating-product flex width-fit-content"
          style={{ "--gap": "0rem" }}
        >
          <button
            className={`rating rating--review btn bg-white fs-400 ff-normal flex align-center ${
              rating === 1 && "active"
            }`}
            style={{ "--gap": "0.2rem" }}
            onClick={() => setRating(1)}
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
          </button>
          <button
            className={`rating rating--review btn bg-white fs-400 ff-normal flex align-center ${
              rating === 2 && "active"
            }`}
            style={{ "--gap": "0.2rem" }}
            onClick={() => setRating(2)}
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
          </button>
          <button
            className={`rating rating--review btn bg-white fs-400 ff-normal flex align-center ${
              rating === 3 && "active"
            }`}
            style={{ "--gap": "0.2rem" }}
            onClick={() => setRating(3)}
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
          </button>
          <button
            className={`rating rating--review btn bg-white fs-400 ff-normal flex align-center ${
              rating === 4 && "active"
            }`}
            style={{ "--gap": "0.2rem" }}
            onClick={() => setRating(4)}
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
          </button>
          <button
            className={`rating rating--review btn bg-white fs-400 ff-normal flex align-center ${
              rating === 5 && "active"
            }`}
            style={{ "--gap": "0.2rem" }}
            onClick={() => setRating(5)}
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
          </button>
        </div>
        <label htmlFor="review-title" className="ff-display">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="input text-dark-primary border-none"
          id="review-title"
          onChange={handleChange}
        />
        <label htmlFor="review" className="ff-display">
          Description
        </label>
        <textarea
          name="description"
          id="review"
          cols="30"
          rows="10"
          className="input text-dark-primary border-none"
          onChange={handleChange}
        ></textarea>
        {areEmpty && (
          <span className="fs-300 fw-700 empty text-align-center">
            Please fill all the fields
          </span>
        )}
        <input
          type="submit"
          className="btn bg-dark-primary text-white"
          value="Submit"
          onClick={handleClick}
        />
      </section>
    </main>
  );
};

export default ReviewProduct;

ReviewProduct.propTypes = {
  loggedInUserId: PropTypes.number,
};
