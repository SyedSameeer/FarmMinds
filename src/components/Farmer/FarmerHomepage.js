import React, { useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests
import "./FarmerHomepage.css";

const FarmerDashboard = () => {
  const [product, setProduct] = useState({
    name: "",
    type: "Rice",
    price: "",
    quantity: "",
    image: null,
  });

  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file }); // Save the file object directly
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.name && product.type && product.price && product.quantity && product.image) {
      try {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("type", product.type);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("image", product.image); // Append the file object, not Base64 data
  
        // Send the product data as form data to the backend
        const response = await axios.post("https://springbootsdpdeploymentfarmminds.up.railway.app/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 201) {
          alert("Product added successfully!");
          setSales([...sales, product]);
          setTotalSales(totalSales + product.price * product.quantity);
          setProduct({ name: "", type: "Rice", price: "", quantity: "", image: null });
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    } else {
      alert("Please fill all fields and upload an image.");
    }
  };
  

  return (
    <div className="farmer-dashboard-custom">
      <h1 className="dashboard-title">Farmer Dashboard</h1>
      <div className="product-form-custom">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            required
            className="input-field-custom"
          />
          <select
            name="type"
            value={product.type}
            onChange={handleInputChange}
            required
            className="dropdown-custom"
          >
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Pulses">Pulses</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price per Unit"
            value={product.price}
            onChange={handleInputChange}
            required
            className="input-field-custom"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
            className="input-field-custom"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="input-field-custom"
          />
          <button type="submit" className="submit-btn-custom">
            Add Product
          </button>
        </form>
      </div>

      <div className="sales-summary-custom">
        <h2 className="summary-title">Sales Summary</h2>
        {sales.length > 0 ? (
          <ul className="sales-list-custom">
            {sales.map((sale, index) => (
              <li key={index} className="sales-item-custom">
                <div>
                  {sale.image && <img src={URL.createObjectURL(sale.image)} alt={sale.name} className="product-image-custom" />}
                  <p>
                    {sale.quantity} x {sale.name} ({sale.type}) - ₹{sale.price * sale.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-sales-text">No sales yet. Start selling!</p>
        )}
        <div className="total-sales-custom">
          <strong>Total Sales: ₹{totalSales}</strong>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
