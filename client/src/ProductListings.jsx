import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProductListings = ({ search, averageRating }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [filterPrice, setFilterPrice] = useState("lowest");

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setCheckedCategories([...new Array(categories.length).fill(false)]);
  }, [categories]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/checked-categories", checkedCategories)
      .then((res) => {
        console.log(res.status);
        axios
          .get(
            `http://localhost:3001/products?price=${filterPrice}${
              search ? `&search=${search}` : ""
            }`
          )
          .then((res) => res.data)
          .then((data) => {
            setProducts(data);
          })
          .catch((err) => console.log(err));
      });
  }, [checkedCategories, search, filterPrice]);
  return (
    <>
      <div
        className="back-prod-header fs-900 ff-display text-white"
        id="__next"
      >
        <div className="container products-header">All Products</div>
      </div>
      <main>
        <div
          className="container container--products grid"
          style={{ "--gap": 0 }}
        >
          <aside className="products-sidebar">
            <div className="nested-checkbox">
              <p className="fw-700 margin-bottom" style={{ "--mb": "0.75rem" }}>
                Categories
              </p>
              <ul>
                {categories.map((category, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      id={i}
                      onChange={(e) => {
                        let aux = checkedCategories;
                        aux[i] = e.target.checked;
                        setCheckedCategories([...aux]);
                      }}
                    />
                    <label
                      htmlFor={i}
                      className="flex align-center"
                      style={{ "--gap": "0.75rem" }}
                    >
                      <div className="custom-checkbox flex align-center justify-center">
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
                      </div>
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid" style={{ "--gap": "1rem" }}>
              <label htmlFor="price-sort">Price (with discount):</label>
              <select
                name="price-sort"
                id="price-sort"
                className="border input width-fit-content"
                onChange={(e) => setFilterPrice(e.target.value)}
              >
                <option value="lowest">Lowest to Highest</option>
                <option value="highest">Highest to Lowest</option>
              </select>
            </div>
          </aside>
          <section className="all-products">
            <div className="grid" style={{ "--gap": "3rem" }}>
              <div
                className="products grid auto-fit"
                style={{ "--gap": "1rem" }}
              >
                {products.map((product, i) => (
                  <Link
                    to={`/products/${product.product_id}`}
                    className="product grid"
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
                ))}
              </div>
              <button className="btn bg-light-gray text-dark-primary width-fit-content self-center">
                Load more
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductListings;

ProductListings.propTypes = {
  search: PropTypes.string,
  averageRating: PropTypes.any,
};
