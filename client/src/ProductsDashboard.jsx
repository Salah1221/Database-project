import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState("lowest");

  useEffect(() => {
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
  }, [refresh, search, filterPrice]);

  const handleDelete = (e) => {
    const index = e.currentTarget.dataset.index;
    axios
      .delete(`http://localhost:3001/products/${products[index].product_id}`)
      .then((res) => {
        console.log(res.data);
        setRefresh((refresh) => refresh + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="products-dashboard-container">
      <section className="container">
        <h1 className="fs-900 ff-display fw-400 margin-bottom">Products</h1>
        <div className="filtering flex space-between margin-bottom">
          <input
            type="text"
            name="search"
            id=""
            className="input input-search border"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex align-center">
            <label htmlFor="price-sort">Price (with discount):</label>
            <select
              name="price-sort"
              id="price-sort"
              className="border input"
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </div>
        </div>
        <div className="products-dashboard justify-center">
          <div className="first-row cell">Product Image</div>
          <div className="first-row cell">Product Title and Description</div>
          <div className="first-row cell">Category</div>
          <div className="first-row cell">Dimensions</div>
          <div className="first-row cell">Weight</div>
          <div className="first-row cell">Stock</div>
          <div className="first-row cell">Price</div>
          <div className="first-row cell">Sale Price</div>
          <div className="empty-cell"></div>
          <div className="empty-cell"></div>
          {products.map((product, i) => (
            <Fragment key={i}>
              <img
                className="cell"
                src={product.image_url}
                alt={product.prod_name}
              />
              <div className="cell">
                <div className="title-and-description">
                  <p className="fs-500 fw-700 cell">{product.prod_name}</p>
                  <p className="description cell">{product.description}</p>
                </div>
              </div>
              <div className="category cell">{product.name}</div>
              <div className="dimensions cell">{product.dimensions}</div>
              <div className="weight cell">{product.weight}</div>
              <div className="stock cell">{product.stock}</div>
              <div className="price cell">{product.price}</div>
              <div className="sale-price cell">
                {product.sale_price ?? "N/A"}
              </div>
              <div>
                <Link
                  to={`/edit-product/${product.product_id}`}
                  data-index={i}
                  className="edit-btn border"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      opacity="1"
                      fill="#2a254b"
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                    />
                  </svg>
                </Link>
              </div>
              <div>
                <button
                  data-index={i}
                  className="delete-btn"
                  onClick={handleDelete}
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
              </div>
            </Fragment>
          ))}
          <Link
            to={"/add-product"}
            className="btn bg-primary text-white add-product-btn"
          >
            + Add Product
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProductsDashboard;
