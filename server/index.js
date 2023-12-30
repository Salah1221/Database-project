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

let products,
  categories,
  checkedCategories = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "furnitureecommerce",
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});

app.post("/checked-categories", (req, res) => {
  checkedCategories = req.body;
  res.status(200).send("Sent Successfully");
});

let filteredCategories = [],
  whereString = "";
app.get("/products", (req, res) => {
  whereString = "";
  let sql = `SELECT * FROM products`;
  if (checkedCategories && categories)
    filteredCategories = categories.filter((_, i) => checkedCategories[i]);
  if (filteredCategories) {
    filteredCategories.forEach((category, i, catArr) => {
      whereString += `categories.category_id = ${category.category_id}`;
      if (i < catArr.length - 1) whereString += " OR ";
    });
  }
  if (whereString) {
    sql = `SELECT * FROM products INNER JOIN categories ON products.category_id = categories.category_id WHERE ${whereString}`;
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
      throw err;
    }
    res.status(200).json(results);
  });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId ?? -1;
  let sql = `SELECT * FROM products WHERE product_id = ${productId}`;
  connection.query(sql, (err, result, fields) => {
    if (err) console.log(err);
    res.status(200).json(result);
  });
});

app.listen(PORT, () => {
  console.log("Listening to port 3001...");
});
