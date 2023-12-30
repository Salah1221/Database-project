import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="container flex justify-flex-end">
          <div
            className="info-card bg-white grid"
            style={{ "--gap": "8.5rem" }}
          >
            <div className="grid" style={{ "--gap": "1.5rem" }}>
              <p className="fs-800 ff-display text-dark-primary">
                Luxury homeware for people who love timeless design quality
              </p>
              <p className="fs-500 text-dark-gray">
                Shop the new Spring 2022 collection today
              </p>
            </div>
            <Link
              to={"/products"}
              className="btn bg-light-gray text-dark-primary width-fit-content"
            >
              View collection
            </Link>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="container">
          <h2
            className="ff-display fw-400 fs-700 text-align-center margin-bottom"
            style={{ "--mb": "2.25rem" }}
          >
            What makes our brand different
          </h2>
          <div
            className="cards grid auto-fit"
            style={{ "--gap": "clamp(1rem, 2.5vw, 4rem)" }}
          >
            <div
              className="card bg-light-gray grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img src="./src/assets/home/Delivery.svg" alt="delivery truck" />
              <h3 className="ff-display fs-600 fw-400">Next day as standard</h3>
              <p>
                Order before 3pm and get your order the next day as standard
              </p>
            </div>
            <div
              className="card bg-light-gray grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img
                src="./src/assets/home/Checkmark--outline.svg"
                alt="checkmark"
              />
              <h3 className="ff-display fs-600 fw-400">
                Made by true artisans
              </h3>
              <p>
                Handmade crafted goods made with real passion and craftmanship
              </p>
            </div>
            <div
              className="card bg-light-gray grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img src="./src/assets/home/Purchase.svg" alt="credit card" />
              <h3 className="ff-display fs-600 fw-400">Unbeatable prices</h3>
              <p>
                For our materials and quality you won’t find better prices
                anywhere
              </p>
            </div>
            <div
              className="card bg-light-gray grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img src="./src/assets/home/Sprout.svg" alt="plant sprout" />
              <h3 className="ff-display fs-600 fw-400">Recycled packaging</h3>
              <p>
                We use 100% recycled to ensure our footprint is more manageable
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-collection">
        <div className="container grid" style={{ "--gap": "3rem" }}>
          <div
            className="products grid auto-fit"
            style={{ "--gap": "clamp(1rem, 2.5vw, 4rem)" }}
          >
            <Link
              to={"/products/111"}
              className="product grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img
                src="./src/assets/products/Photo-1.png"
                alt="chair"
                className="margin-bottom"
                style={{ "--mb": "0.5rem" }}
              />
              <div className="fs-600 ff-display flex space-between align-center">
                <div className="product-name">The Dandy Chair</div>
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
                  $100
                  <span className="discount">50%</span>
                </span>
                <span className="fs-500 original-price">$200</span>
              </span>
            </Link>
            <Link className="product grid" style={{ "--gap": "0.75rem" }}>
              <img
                src="./src/assets/products/Photo-2.png"
                alt="chair"
                className="margin-bottom"
                style={{ "--mb": "0.5rem" }}
              />
              <div className="fs-600 ff-display flex space-between align-center">
                <div className="product-name">The Dandy Chair</div>
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
                  <span className="discount"></span>
                </span>
                <span className="fs-500 original-price">$200</span>
              </span>
            </Link>
            <Link className="product grid" style={{ "--gap": "0.75rem" }}>
              <img
                src="./src/assets/products/Photo-3.png"
                alt="chair"
                className="margin-bottom"
                style={{ "--mb": "0.5rem" }}
              />
              <div className="fs-600 ff-display flex space-between align-center">
                <div className="product-name">The Dandy Chair</div>
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
                  <span className="discount"></span>
                </span>
                <span className="fs-500 original-price">$200</span>
              </span>
            </Link>
            <Link className="product grid" style={{ "--gap": "0.75rem" }}>
              <img
                src="./src/assets/products/Photo-4.png"
                alt="chair"
                className="margin-bottom"
                style={{ "--mb": "0.5rem" }}
              />
              <div className="fs-600 ff-display flex space-between align-center">
                <div className="product-name">The Dandy Chair</div>
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
                  <span className="discount"></span>
                </span>
                <span className="fs-500 original-price">$200</span>
              </span>
            </Link>
          </div>
          <Link
            to={"/products"}
            className="btn bg-light-gray text-dark-primary width-fit-content self-center"
          >
            View collection
          </Link>
        </div>
      </section>
      <section className="small-idea">
        <div
          className="container flex"
          style={{ "--gap": "clamp(1rem, 2.5vw, 4rem)" }}
        >
          <div
            className="info-card bg-dark-primary grid"
            style={{ "--gap": "8.5rem" }}
          >
            <div className="grid" style={{ "--gap": "1.5rem" }}>
              <p className="fs-800 ff-display text-white">
                It started with a small idea
              </p>
              <p className="fs-500 text-white">
                A global brand with local beginnings, our story begain in a
                small studio in South London in early 2014
              </p>
            </div>
            <Link
              to={"/products"}
              className="btn bg-transparent-white text-white width-fit-content"
            >
              View collection
            </Link>
          </div>
          <img src="./src/assets/home/small-idea.png" alt="" />
        </div>
      </section>
    </main>
  );
};

export default Home;
