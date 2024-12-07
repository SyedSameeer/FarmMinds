import React, { useState } from 'react';
import './Navbar.css';
import { FaCartPlus, FaUser, FaSearchLocation } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios'; // Import axios
import 'leaflet/dist/leaflet.css';

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [1, -34],
});

function Navbar() {
  const [address, setAddress] = useState('Select Location');
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([51.505, -0.09]);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Reverse Geocoding to get the address from coordinates
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const locationData = response.data;
      const { road, village, city, state, country } = locationData.address;
      const readableAddress = `${road || ''}, ${village || city || state || ''}, ${country}`;
      setAddress(readableAddress);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Unable to fetch address');
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
    fetchAddress(lat, lng); // Fetch address when map is clicked
    setMapVisible(false);
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the landing page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FarmMinds</h1>
      </div>

      {/* Deliver To Section */}
      <div className="navbar-location">
        <FaSearchLocation />
        <button className="location-button" onClick={() => setMapVisible(true)}>
          {address}
        </button>
      </div>

      {/* Centered Navigation Links */}
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/homepage">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/blog">Blogs</Link></li>
          <li className="categories">
            <a href="#categories" className="categories-link">Categories</a>
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li><a href="#fruits">Fruits</a></li>
                <li><a href="#vegetables">Vegetables</a></li>
                <li><a href="#dairy">Dairy</a></li>
                <li><a href="#nuts">Nuts</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Right-aligned Cart and Profile Buttons */}
      <div className="navbar-right">
        <Link to="/cart">
          <button className="cart-button"><FaCartPlus /></button>
        </Link>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <button
            className="profile-button"
            onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}
          >
            <FaUser />
          </button>
          {profileDropdownVisible && (
            <ul className="profile-dropdown-menu">
              <li><Link to="/account">Account</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          )}
        </div>
      </div>

      {/* Map Modal */}
      {mapVisible && (
        <div className={`map-modal ${mapVisible ? 'show' : ''}`}>
          <div className="map-container">
            <button className="close-button" onClick={() => setMapVisible(false)}>X</button>
            <MapContainer center={selectedLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={selectedLocation} icon={customIcon} />
              <MapClickHandler onClick={handleMapClick} />
            </MapContainer>
          </div>
        </div>
      )}
    </nav>
  );
}

function MapClickHandler({ onClick }) {
  useMapEvents({
    click: onClick,
  });
  return null;
}

export default Navbar;
