import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3001;

let categories,
  checkedCategories = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "furnitureecommerce",
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});

app.post("/signin", (req, res) => {
  let sql;
  if (req.body) {
    const user = req.body;
    sql = `INSERT INTO users(first_name, last_name, email, password, role)
    VALUES('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}', 'customer')`;
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else res.status(200).json({ id: results.insertId });
    });
  } else res.status(500);
  console.log(req.body);
});

app.post("/login", (req, res) => {
  let sql;
  if (req.body) {
    const user = req.body;
    sql = `SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'`;
    connection.query(sql, (err, results, fields) => {
      console.log(results);
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        if (results.length > 0) {
          res.status(200).json({ id: results[0].user_id });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      }
    });
  } else res.status(500);
});

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = `SELECT * FROM users WHERE user_id = ${userId}`;
  connection.query(sql, (err, result, fields) => {
    if (err) console.log(err);
    res.status(200).json(result);
  });
});

app.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = `SELECT * FROM cart_item_total_and_discount WHERE customer_id = ${userId}`;
  let sql2 = `SELECT SUM(total_price) AS all_total_price FROM cart_item_total_and_discount WHERE customer_id = ${userId};`;
  connection.query(sql, (err, result, fields) => {
    if (err) {
      res.status(500).send("Server error");
      throw err;
    }
    const firstResult = result;
    connection.query(sql2, (err, result, fields) => {
      if (err) {
        res.status(500).send("Server error");
        throw err;
      }
      res.status(200).json({
        items: firstResult,
        allTotalPrice: result[0].all_total_price,
      });
    });
  });
});

app.post("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  // First, check if the product already exists in the cart for the user
  connection.query(
    "SELECT * FROM carts WHERE customer_id = ? AND product_id = ?",
    [userId, productId],
    (error, results) => {
      if (error) {
        res.status(500).send("Server error");
      } else if (results.length > 0) {
        // If the product already exists in the cart, update the quantity
        const newQuantity = +results[0].quantity + +quantity;
        connection.query(
          "UPDATE carts SET quantity = ? WHERE customer_id = ? AND product_id = ?",
          [newQuantity, userId, productId],
          (error, results) => {
            if (error) {
              res.status(500).send("Server error");
            } else {
              res.send("Cart updated successfully");
            }
          }
        );
      } else {
        // If the product doesn't exist in the cart, create a new cart item
        connection.query(
          "INSERT INTO carts (customer_id, product_id, quantity) VALUES (?, ?, ?)",
          [userId, productId, quantity],
          (error, results) => {
            if (error) {
              res.status(500).send("Server error");
            } else {
              res.send("Cart item added successfully");
            }
          }
        );
      }
    }
  );
});

app.delete("/cart/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  connection.query(
    "DELETE FROM carts WHERE customer_id = ? AND product_id = ?",
    [userId, productId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Server error");
        return;
      } else {
        res.status(200).send("Cart item deleted successfully");
      }
    }
  );
});

app.delete("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    "DELETE FROM carts WHERE customer_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Server error");
        return;
      } else {
        res.status(200).send("Cart deleted successfully");
      }
    }
  );
});

app.post("/checkout/:userId", (req, res) => {
  const userId = req.params.userId;
  const { address, orderTotal, paymentMethod } = req.body;
  connection.query(
    "INSERT INTO orders (customer_id, shipping_address, order_total, payment_method) VALUES (?, ?, ?, ?)",
    [userId, address, orderTotal, paymentMethod],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Server error");
        return;
      } else {
        res.status(200).json({ order_id: results.insertId });
      }
    }
  );
});

app.post("/checkout/:userId/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const { cartItems } = req.body;
  cartItems.forEach((item) => {
    connection.query(
      "INSERT INTO orderdetails (order_id, product_id, quantity, unit_price, discount) VALUES (?, ?, ?, ?, ?)",
      [orderId, item.product_id, item.quantity, item.price, item.discount],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send("Server error");
          return;
        } else {
          res.status(200).send("Order items added successfully");
        }
      }
    );
  });
});

app.post("/checked-categories", (req, res) => {
  checkedCategories = req.body;
  res.status(200).send("Sent Successfully");
});

let filteredCategories = [],
  whereString = "",
  searchString = "";
app.get("/products", (req, res) => {
  whereString = "";
  searchString = "";
  let sql = `SELECT * FROM products`;
  const search = req.query.search ?? "";
  if (checkedCategories && categories)
    filteredCategories = categories.filter((_, i) => checkedCategories[i]);
  if (filteredCategories) {
    filteredCategories.forEach((category, i, catArr) => {
      whereString += `categories.category_id = ${category.category_id}`;
      if (i < catArr.length - 1) whereString += " OR ";
    });
  }
  if (search) {
    searchString += `prod_name LIKE '%${search}%'`;
  }
  if (whereString) {
    sql = `SELECT * FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.category_id 
    WHERE ${whereString}`;
  }
  if (searchString && whereString) {
    sql += ` AND ${searchString}`;
  } else if (searchString) {
    sql += ` WHERE ${searchString}`;
  }
  connection.query(sql, async (err, result, fields) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/categories", async (req, res) => {
  let sql = `SELECT * FROM categories`;
  connection.query(sql, (err, results, fields) => {
    categories = results;
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.status(200).json(results);
  });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = `SELECT * FROM products WHERE product_id = ${productId}`;
  connection.query(sql, (err, result, fields) => {
    if (err) console.log(err);
    res.status(200).json(result);
  });
});

app.get("/products-top4", (req, res) => {
  const sql = `SELECT * FROM products ORDER BY product_id DESC LIMIT 4`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/has-user-purchased-product/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  let sql = `CALL HasUserBoughtProduct(${userId}, ${productId}, @hasBought)`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    connection.query(
      "SELECT @hasBought AS hasBought",
      (err, result, fields) => {
        if (err) throw err;
        res.status(200).json(result[0]);
      }
    );
  });
});

app.post("/review/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const { rating, title, description } = req.body;
  let sql = `INSERT INTO reviews (product_id, customer_id, rating, review_title, review_text) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [productId, userId, rating, title, description],
    (err, result, fields) => {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});

app.get("/reviews/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = `SELECT * FROM reviews 
  INNER JOIN users
  ON reviews.customer_id = users.user_id
  WHERE product_id = ${productId}`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/has-user-reviewed-product/:userId/:productId", (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  let sql = `CALL HasUserReviewedProduct(${userId}, ${productId}, @hasReviewed)`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    connection.query(
      "SELECT @hasReviewed AS hasReviewed",
      (err, result, fields) => {
        if (err) throw err;
        res.status(200).json(result[0]);
      }
    );
  });
});

app.get("/ratings-info/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = `CALL RatingsInfo(${productId})`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.status(200).json(result[0]);
  });
});

app.get("/average-ratings/", (req, res) => {
  let sql = `SELECT product_id, ROUND(AVG(rating), 1) AS averageRating
  FROM reviews
  GROUP BY product_id`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    let resultObj = result.reduce((obj, result_item) => {
      obj[result_item.product_id] = result_item.averageRating;
      return obj;
    }, {});
    res.status(200).json(resultObj);
  });
});

app.listen(PORT, () => {
  console.log("Listening to port 3001...");
});
