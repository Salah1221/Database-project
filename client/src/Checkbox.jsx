import axios from "axios";
import { useEffect, useState } from "react";

const Checkbox = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="nested-checkbox">
      <p className="fw-700 margin-bottom" style={{ "--mb": "0.75rem" }}>
        Categories
      </p>
      <ul>
        {categories.map((category, i) => (
          <li key={i}>
            <input type="checkbox" id={i} />
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
  );
};

export default Checkbox;
