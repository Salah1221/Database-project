import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([{ id: -1, name: "" }]);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [data, setData] = useState({});
  const [oldData, setOldData] = useState({});
  const [image, setImage] = useState(null);
  const navigator = useNavigate();
  const productId = useParams().productId;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("product-image", selectedImage);
    for (let key in data) {
      if (key !== "dimensions") formData.append(key, data[key]);
    }
    if (data.length && data.width && data.height)
      formData.append(
        "dimensions",
        `${data.length}x${data.width}x${data.height}`
      );
    if (productId) {
      formData.append("oldImage", oldData.image_url);
      console.log(data);
      axios
        .put(`http://localhost:3001/products/${productId}`, formData)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) navigator("/");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/upload", formData)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) navigator("/");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:3001/products/${productId}`)
        .then((res) => res.data)
        .then((data) => {
          setImage(data[0].image_url);
          setOldData(data[0]);
          setData({
            ...data[0],
            length: data[0].dimensions.split("x")[0],
            width: data[0].dimensions.split("x")[1],
            height: data[0].dimensions.split("x")[2],
          });
        })
        .catch((err) => console.log(err));
    }
  }, [productId]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section
        className="container grid add-product"
        style={{ "--gap": "2rem" }}
      >
        <h1 className="fs-900 ff-display fw-400 margin-bottom">Add Product</h1>
        <div className="grid" style={{ "--gap": "1rem" }}>
          {image && <img src={image} alt="" />}
          <label htmlFor="product-image">Upload Image:</label>
          <input
            type="file"
            name="product-image"
            id="product-image"
            className="width-fit-content"
            onInput={handleImageChange}
          />
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            name="prod_name"
            id="product-name"
            className="input border-none"
            defaultValue={oldData.prod_name ?? ""}
            onInput={handleChange}
          />
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-description">Product Description:</label>
          <textarea
            name="description"
            id="product-description"
            className="input border-none"
            defaultValue={oldData.description ?? ""}
            rows={10}
            onInput={handleChange}
          />
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-category">Choose Category:</label>
          <div className="flex">
            <select
              name="category_id"
              className="input border-none"
              id="product-category"
              onInput={(e) => {
                setIsNewCategory(e.target.value === "add-new");
                handleChange(e);
              }}
              defaultValue={oldData.category_id ?? categories[0].id}
            >
              {categories.map((category, i) => (
                <option key={i} value={category.category_id}>
                  {category.name}
                </option>
              ))}
              <option key={1000} value="add-new">
                + Add new category
              </option>
            </select>
            {isNewCategory && (
              <input
                type="text"
                name="newCategory"
                className="input border-none"
                placeholder="Enter new category"
                onInput={handleChange}
              />
            )}
          </div>
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-dimensions">Dimensions:</label>
          <div className="flex align-center">
            <input
              type="text"
              name="length"
              id="product-dimensions"
              className="stock-input border-none input text-align-center"
              placeholder="Length"
              defaultValue={
                oldData.dimensions ? oldData.dimensions.split("x")[0] : ""
              }
              onInput={handleChange}
            />
            X
            <input
              type="text"
              className="stock-input border-none input text-align-center"
              name="width"
              placeholder="Width"
              defaultValue={
                oldData.dimensions ? oldData.dimensions.split("x")[1] : ""
              }
              onInput={handleChange}
            />
            X
            <input
              type="text"
              className="stock-input border-none input text-align-center"
              name="height"
              placeholder="Height"
              defaultValue={
                oldData.dimensions ? oldData.dimensions.split("x")[2] : ""
              }
              onInput={handleChange}
            />
          </div>
        </div>
        <div className="flex align-center" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-weight">Weight:</label>
          <input
            type="text"
            name="weight"
            className="stock-input text-align-center input border-none"
            id="product-weight"
            placeholder="Weight (kg)"
            defaultValue={oldData.weight ?? ""}
            onInput={(e) => {
              if (e.target.value <= 0 && e.target.value.length > 0)
                e.target.value = 1;
              handleChange(e);
            }}
          />
        </div>
        <div className="flex align-center" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-stock">Stock:</label>
          <input
            type="number"
            name="stock"
            className="stock-input text-align-center input border-none"
            id="product-stock"
            defaultValue={oldData.stock ?? 1}
            onInput={(e) => {
              if (e.target.value <= 0 && e.target.value.length > 0)
                e.target.value = 1;
              e.target.value = Math.floor(e.target.value);
              handleChange(e);
            }}
          />
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-price">Product price:</label>
          <input
            type="text"
            name="price"
            id="product-price"
            className="input border-none"
            defaultValue={oldData.price ?? ""}
            onInput={handleChange}
          />
        </div>
        <div className="grid" style={{ "--gap": "1rem" }}>
          <label htmlFor="product-sale-price">Product sale price:</label>
          <input
            type="text"
            name="sale_price"
            id="product-sale-price"
            className="input border-none"
            defaultValue={oldData.sale_price ?? ""}
            placeholder="Leave blank if no sale"
            onInput={handleChange}
          />
        </div>

        <button
          className="btn bg-dark-primary text-white"
          onClick={handleUpload}
        >
          Submit
        </button>
      </section>
    </main>
  );
};

export default AddProduct;
