import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReviewProduct = () => {
  const params = useParams();
  useEffect(() => console.log(params), [params]);
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
            className="rating rating--review btn bg-white fs-400 ff-normal flex align-center"
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
          </button>
          <button
            className="rating rating--review btn bg-white fs-400 ff-normal flex align-center"
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
          </button>
          <button
            className="rating rating--review btn bg-white fs-400 ff-normal flex align-center"
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
          </button>
          <button
            className="rating rating--review btn bg-white fs-400 ff-normal flex align-center"
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
          </button>
          <button
            className="rating rating--review btn bg-white fs-400 ff-normal flex align-center"
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
          </button>
        </div>
        <label htmlFor="review-title" className="ff-display">
          Title
        </label>
        <input
          type="text"
          name="review-title"
          className="input text-dark-primary border-none"
          id="review-title"
        />
        <label htmlFor="review" className="ff-display">
          Description
        </label>
        <textarea
          name="review"
          id="review"
          cols="30"
          rows="10"
          className="input text-dark-primary border-none"
        ></textarea>
        <input
          type="submit"
          className="btn bg-dark-primary text-white"
          value="Submit"
        />
      </section>
    </main>
  );
};

export default ReviewProduct;
