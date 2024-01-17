import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const orderId = useParams().orderId;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const [orderDetails, setOrderDetails] = useState([]);
  const handlePrint = () => {
    window.print();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders/${orderId}`)
      .then((res) => res.data)
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  return (
    <main>
      <section className="container">
        <h1 className="fs-900 ff-display fw-400 margin-bottom">
          Order Details |
          <span className="text-primary">
            {orderDetails.length && ` ${orderDetails[0].first_name}'s Order`}
          </span>
        </h1>
        <div className="grid margin-bottom">
          <div className="flex align-center">
            <p className="fs-600 ff-display text-primary">Order</p>
            <p className="fs-700 ff-display text-dark-primary">#{orderId}</p>
          </div>
          <div className="flex align-center">
            <p className="fs-600 ff-display text-primary">Order Date</p>
            <p className="fs-700 ff-display text-dark-primary">
              {orderDetails.length > 0 &&
                new Date(orderDetails[0].order_date).toLocaleDateString(
                  "en-US",
                  options
                )}
            </p>
          </div>
        </div>
        <div className="order-details-list justify-center margin-bottom">
          <div className="first-row cell">Product Name</div>
          <div className="first-row cell">Quantity</div>
          <div className="first-row cell">Unit Price</div>
          <div className="first-row cell">Discount</div>
          {orderDetails.map((product, i) => (
            <Fragment key={i}>
              <p className="fs-500 fw-700 cell cell-prod-name">
                {product.prod_name}{" "}
                {product.is_deleted ? (
                  <span className="deleted_label">N/A</span>
                ) : (
                  ""
                )}
              </p>
              <div className="quantity cell">{product.quantity}</div>
              <div className="price cell">{product.unit_price}</div>
              <div className="disc cell">
                {product.discount ? `${product.discount}%` : "N/A"}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="grid">
          {orderDetails.length > 0 && (
            <div className="flex align-center justify-flex-end">
              <div className="fs-600 ff-display text-primary">Total</div>
              <div className="fs-700 ff-display text-dark-primary">
                ${orderDetails[0].order_total}
              </div>
            </div>
          )}
          <button
            onClick={handlePrint}
            className="btn text-white bg-dark-primary print"
          >
            Print Order
          </button>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
