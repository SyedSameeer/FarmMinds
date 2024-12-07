import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    mobileNumber: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    isDefault: false,
    deliveryInstructions: ''
  });
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state to track order placement

  useEffect(() => {
    // Load saved address from local storage (if available)
    const savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const handleNextStep = () => {
    if (step === 1 && validateAddress()) {
      // Save address to local storage
      localStorage.setItem('savedAddress', JSON.stringify(address));
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => setStep(step - 1);

  const validateAddress = () => {
    // Basic validation: Check if all fields are filled
    const isValid = address.fullName && address.mobileNumber && address.pincode && address.flat && address.area && address.city && address.state;
    setIsAddressValid(isValid);
    return isValid;
  };

  const handlePlaceOrder = () => {
    // Set orderPlaced to true when order is placed
    setOrderPlaced(true);
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-steps">
        {orderPlaced ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="order-success">
              <h2>Order Placed Successfully!</h2>
              <p>Your order has been placed. Thank you for shopping with us.</p>
              <button onClick={() => window.location.href = '/products'} className="primary-btn">Go Back to Shopping</button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {step === 1 && (
              <div className="address-section">
                <h2>Enter Delivery Address</h2>
                {!isAddressValid && <p className="error-text">Please fill in all fields.</p>}
                
                <label>Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="Harsha Sai"
                />

                <label>Mobile Number</label>
                <input
                  type="text"
                  value={address.mobileNumber}
                  onChange={(e) => setAddress({ ...address, mobileNumber: e.target.value })}
                  placeholder="9876543210"
                />

                <label>Pincode</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  placeholder="521241"
                />

                <label>Flat, House No., Building</label>
                <input
                  type="text"
                  value={address.flat}
                  onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                  placeholder="Flat 101, ABC Apartments"
                />

                <label>Area, Street, Sector</label>
                <input
                  type="text"
                  value={address.area}
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  placeholder="Sector 12, Main Street"
                />

                <label>Landmark (optional)</label>
                <input
                  type="text"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="Near Apollo Hospital"
                />

                <label>Town/City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="New Delhi"
                />

                <label>State</label>
                <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                  <option value="">Choose a state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>

                <label>
                  <input
                    type="checkbox"
                    checked={address.isDefault}
                    onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
                  />
                  Make this my default address
                </label>

                <label>Delivery Instructions (optional)</label>
                <textarea
                  value={address.deliveryInstructions}
                  onChange={(e) => setAddress({ ...address, deliveryInstructions: e.target.value })}
                  placeholder="Add preferences, notes, access codes and more"
                />

                <button onClick={handleNextStep} disabled={!isAddressValid} className="primary-btn">Next</button>
              </div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="review-section">
                  <h2>Order Summary</h2>
                  <p><strong>Address:</strong> {address.fullName}, {address.flat}, {address.area}, {address.city}, {address.state} - {address.pincode}</p>
                  <button onClick={handlePrevStep} className="secondary-btn">Back</button>
                  <button onClick={handlePlaceOrder} className="primary-btn">Place Order</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
