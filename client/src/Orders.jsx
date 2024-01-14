import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => res.data)
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main>
      <section className="container">
        <h1 className="fs-900 ff-display fw-400 margin-bottom">Orders</h1>
        <div className="orders-list">
          <div className="first-row cell">Order ID</div>
          <div className="first-row cell">Customer Name</div>
          <div className="first-row cell">Order Date</div>
          <div className="first-row cell">Total Price</div>
          <div className="first-row cell">Payment Method</div>
          <div className="first-row cell">Shipping Address</div>
          <div className="empty-cell"></div>
          {orders.map((order, i) => (
            <Fragment key={i}>
              <div className="cell">{order.order_id}</div>
              <div className="cell">
                {order.first_name} {order.last_name}
              </div>
              <div className="cell">
                {new Date(order.order_date).toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
              <div className="cell">{order.order_total}</div>
              <div className="cell">{order.payment_method}</div>
              <div className="cell">{order.shipping_address}</div>
              <div className="cell">
                <Link to={`/orders/${order.order_id}`} className="view-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="18"
                    viewBox="0 0 576 512"
                  >
                    <path
                      opacity="1"
                      fill="#fff"
                      d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                    />
                  </svg>
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Orders;
