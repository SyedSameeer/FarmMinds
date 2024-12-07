import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas for QR code generation
import '../pages/Cart.css';
import CheckoutPage from './CheckoutPage';

export default function CartPage() {
  const { cart, removeFromCart, calculateTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [qrTimeout, setQrTimeout] = useState(null);
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setShowQRCode(false);
    setPaymentSuccess(false);
  };

  const handleGenerateQRCode = () => {
    setShowQRCode(true);  // Show QR code immediately

    // Set a timeout to remove QR code after 10 seconds
    setQrTimeout(setTimeout(() => {
      setShowQRCode(false);  // Hide QR code after 10 seconds
      setIsLoading(true);  // Start loading spinner
    }, 10000));  // 10 seconds

    // Set a timeout to show success after 5 seconds of loading
    setLoadingTimeout(setTimeout(() => {
      setIsLoading(false);  // End loading spinner
      setPaymentSuccess(true);  // Show payment success message
    }, 15000));  // 5 seconds after QR code hides
  };

  const totalAmount = calculateTotalPrice().toFixed(2);
  const yourUPIId = "8919982371@ybl";
  const transactionId = "txn-" + new Date().getTime();
  const upiLink = `upi://pay?pa=${yourUPIId}&pn=YourName&am=${totalAmount}&cu=INR&tid=${transactionId}`;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {isCheckingOut ? (
        <CheckoutPage />
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.name} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: x{item.quantity}</p>
                    <button onClick={() => removeFromCart(item)} className="remove-item-button">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Total: ₹{totalAmount}</p>

            {/* QR Code Generation Button */}
            <button onClick={handleGenerateQRCode} className="generate-qr-button">
              Generate UPI QR Code
            </button>

            {/* Show QR Code for 10 seconds */}
            {showQRCode && !isLoading && !paymentSuccess && (
              <div className="qr-code-container">
                <h3>Scan this QR code to pay</h3>
                <QRCodeCanvas value={upiLink} size={256} />
              </div>
            )}

            {/* Loading Spinner (after 10 seconds) */}
            {isLoading && !paymentSuccess && (
              <div className="loading-spinner">
                <p>Processing Payment...</p>
                <div className="spinner"></div>
              </div>
            )}

            {/* Payment Success Message */}
            {paymentSuccess && (
              <div className="payment-success">
                <p>Payment Successful!</p>
                <span className="tick">&#10003;</span>
                <button onClick={handleCheckout} className="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
