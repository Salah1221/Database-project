import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const url_params = useParams();
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
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${url_params.productId}`)
      .then((res) => res.data)
      .then((data) => setProduct(data));
  }, [url_params.productId]);
  const dimensionsArr = product[0].dimensions.split("x");
  return (
    <main>
      <div
        className="product-info flex align-start"
        style={{ "--gap": "3.88rem" }}
      >
        <img src={product[0].image_url} alt={product[0].prod_name} />
        <div className="info-card bg-white grid" style={{ "--gap": "2.5rem" }}>
          <div className="grid" style={{ "--gap": "0.8rem" }}>
            <p className="fs-900 ff-display text-dark-primary">
              {product[0].prod_name}
            </p>
            <div className="rating-stars" style={{ "--rating": 4.5 }}></div>
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
              <span className="fs-700 original-price">${product[0].price}</span>
            </span>
          </div>
          <div className="description">
            <p className="ff-display margin-bottom" style={{ "--mb": "1rem" }}>
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
              type="text"
              className="quantity-input bg-light-gray text-dark-primary text-align-center border-none"
              defaultValue={"1"}
            />
          </div>
          <div className="btns flex" style={{ "--gap": "1rem" }}>
            <button className="btn bg-dark-primary text-white width-fit-content">
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
                4.5
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
                  <div className="bar"></div>
                  <div className="rating-count">(134)</div>
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
                  <div className="bar"></div>
                  <div className="rating-count">(134)</div>
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
                  <div className="bar"></div>
                  <div className="rating-count">(134)</div>
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
                  <div className="bar"></div>
                  <div className="rating-count">(134)</div>
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
                  <div className="bar"></div>
                  <div className="rating-count">(134)</div>
                </div>
              </div>
            </div>
            <Link
              to={`/products/${url_params.productId}/review`}
              className="btn bg-primary text-white width-fit-content"
            >
              Write a Review
            </Link>
          </div>
          <div className="reviews">
            <div className="review grid">
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
                  4
                </div>
                <p className="fs-600 fw-700">Very good</p>
              </div>
              <p className="review-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
                quam sequi esse nihil veritatis. Rerum aperiam deserunt
                voluptatum, accusantium at labore quibusdam debitis voluptatem
                officia, culpa doloribus modi unde doloremque!
              </p>
              <p
                className="customer fw-700 text-dark-gray flex align-center"
                style={{ "--gap": "0.5rem" }}
              >
                Mustafa Esber
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
                <span className="fw-400 fs-300">April, 2023</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-collection">
        <div className="container grid" style={{ "--gap": "3rem" }}>
          <div className="products grid auto-fit" style={{ "--gap": "1rem" }}>
            <Link
              to={"/products/111"}
              className="product grid"
              style={{ "--gap": "0.75rem" }}
            >
              <img
                src="/src/assets/products/Photo-1.png"
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
                src="/src/assets/products/Photo-2.png"
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
                src="/src/assets/products/Photo-3.png"
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
                src="/src/assets/products/Photo-4.png"
                alt="chair"
                className="margin-bottom"
                style={{ "--mb": "0.5rem" }}
                key={4}
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
    </main>
  );
};

export default Product;
