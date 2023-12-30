const Cart = () => {
  return (
    <main>
      <section className="container grid">
        <h1 className="fs-900 ff-display fw-400 margin-bottom">
          Your shopping cart
        </h1>
        <div className="cart align-center margin-bottom">
          <div className="title-1">Products</div>
          <div className="title-2 self-end">Quantity</div>
          <div className="title-3 self-end">Total (each)</div>
          <div className="product-details flex align-start">
            <img src="/src/assets/products/Photo-1.png" alt="chair" />
            <div className="info grid" style={{ "--gap": "0.4rem" }}>
              <h3 className="fs-500 ff-display fw-400">The Dandy Chair</h3>
              <div className="description fs-300">
                Lorem ipsum dolor sit amet, consectetur nostrum!
              </div>
              <span className="price price--product price--cart">
                <span className="fs-400 discount-price">
                  $100
                  <span className="discount">50%</span>
                </span>
                <span className="fs-400 original-price">$200</span>
              </span>
            </div>
          </div>
          <div className="quantity self-end">2</div>
          <div className="total-price self-end">$200</div>
          <div className="product-details flex align-start">
            <img src="/src/assets/products/Photo-1.png" alt="chair" />
            <div className="info grid" style={{ "--gap": "0.4rem" }}>
              <h3 className="fs-500 ff-display fw-400">The Dandy Chair</h3>
              <div className="description fs-300">
                Lorem ipsum dolor sit amet, consectetur nostrum!
              </div>
              <span className="price price--product price--cart">
                <span className="fs-400 discount-price">
                  <span className="discount"></span>
                </span>
                <span className="fs-400 original-price">$200</span>
              </span>
            </div>
          </div>
          <div className="quantity self-end">2</div>
          <div className="total-price self-end">$400</div>
        </div>
        <div className="self-end grid" style={{ "--gap": "0.8rem" }}>
          <div className="flex align-center justify-flex-end">
            <div className="fs-600 ff-display text-primary">Total</div>
            <div className="fs-700 ff-display text-dark-primary">$600</div>
          </div>
          <p className="fs-300 text-primary self-end">
            Shipping is free of cost!
          </p>
          <button className="btn bg-dark-primary text-white">
            Go to Checkout
          </button>
        </div>
      </section>
    </main>
  );
};

export default Cart;
