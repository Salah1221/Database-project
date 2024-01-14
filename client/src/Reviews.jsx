import axios from "axios";
import { useEffect, useState } from "react";
import { timeAgo } from "./timeAgo";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews?ratingFilter=${activeFilter}`)
      .then((res) => res.data)
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [activeFilter]);

  return (
    <main>
      <section className="container">
        <h1 className="fs-900 ff-display fw-400 margin-bottom">All Reviews</h1>
        <div className="margin-bottom flex ratings-filter">
          <button
            className={!activeFilter && "active"}
            onClick={() => setActiveFilter(0)}
          >
            All
          </button>
          <button
            className={`flex align-center${
              activeFilter === 5 ? " active" : ""
            }`}
            style={{ "--gap": "0.25rem" }}
            onClick={() => setActiveFilter(5)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="18"
              viewBox="0 0 576 512"
            >
              <path
                opacity="1"
                fill="var(--clr-dark-primary)"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>{" "}
            5
          </button>
          <button
            className={`flex align-center${
              activeFilter === 4 ? " active" : ""
            }`}
            style={{ "--gap": "0.25rem" }}
            onClick={() => setActiveFilter(4)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="18"
              viewBox="0 0 576 512"
            >
              <path
                opacity="1"
                fill="var(--clr-dark-primary)"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>{" "}
            4
          </button>
          <button
            className={`flex align-center${
              activeFilter === 3 ? " active" : ""
            }`}
            style={{ "--gap": "0.25rem" }}
            onClick={() => setActiveFilter(3)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="18"
              viewBox="0 0 576 512"
            >
              <path
                opacity="1"
                fill="var(--clr-dark-primary)"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>{" "}
            3
          </button>
          <button
            className={`flex align-center${
              activeFilter === 2 ? " active" : ""
            }`}
            style={{ "--gap": "0.25rem" }}
            onClick={() => setActiveFilter(2)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="18"
              viewBox="0 0 576 512"
            >
              <path
                opacity="1"
                fill="var(--clr-dark-primary)"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>{" "}
            2
          </button>
          <button
            className={`flex align-center${
              activeFilter === 1 ? " active" : ""
            }`}
            style={{ "--gap": "0.25rem" }}
            onClick={() => setActiveFilter(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="18"
              viewBox="0 0 576 512"
            >
              <path
                opacity="1"
                fill="var(--clr-dark-primary)"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>{" "}
            1
          </button>
        </div>
        <div className="reviews">
          {reviews.map((review, i) => (
            <div className="review grid" key={i}>
              <div
                className="product-in-review flex align-center"
                style={{ "--gap": "2rem" }}
              >
                <img
                  src={review.image_url}
                  alt={review.prod_name}
                  className="review-img"
                />
                <p className="fs-500 ff-display">{review.prod_name}</p>
              </div>
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
          ))}
        </div>
      </section>
    </main>
  );
};

export default Reviews;
