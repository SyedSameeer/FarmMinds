import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from './trail';
import DashboardStats from './DashboardStats';
import UserTable from './UserTable';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);  // State to store users
  const [products, setProducts] = useState([]);  // State to store products
  const [totalRevenue, setTotalRevenue] = useState(0);  // State for total revenue

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  // Calculate the total revenue dynamically based on the product prices and quantities.
  useEffect(() => {
    const calculateTotalRevenue = () => {
      const revenue = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotalRevenue(revenue);
    };
    calculateTotalRevenue();
  }, [products]);

  return (
    <div className="admin-dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-dashboard-content">
        {activeTab === 'dashboard' && (
          <DashboardStats
            userCount={users.length}  // Real user count
            productCount={products.length}  // Real product count
            totalRevenue={totalRevenue}  // Real total revenue
          />
        )}
        {activeTab === 'users' && (
          <UserTable users={users} onEdit={() => {}} onDelete={() => {}} />
        )}
        {activeTab === 'products' && (
          <div>
            <h2>Products</h2>
            {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.image && <img src={product.image} alt={product.name} />}
                    <p>
                      {product.name} ({product.type}) - ₹{product.price} x {product.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products available.</p>
            )}
          </div>
        )}
        {activeTab === 'settings' && <div>Settings Panel Coming Soon!</div>}
      </div>
    </div>
  );
}
