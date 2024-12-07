import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas instead of QRCode

const PaymentQRCode = () => {
  const [paymentLink, setPaymentLink] = useState(null);

  const generatePaymentLink = async (amount, email) => {
    try {
      // Call your backend API to generate the payment link
      const response = await fetch(
        `/payment/create?amount=${amount}&customerEmail=${email}`,
        {
          method: "POST",
        }
      );
      const link = await response.text();
      setPaymentLink(link); // Set the payment link to state
    } catch (error) {
      console.error("Error generating payment link:", error);
    }
  };

  return (
    <div>
      <h2>Generate Payment QR Code</h2>
      <button onClick={() => generatePaymentLink(500, "customer@example.com")}>
        Generate Payment Link
      </button>
      {paymentLink ? (
        <div>
          <h3>Scan this QR code to pay</h3>
          <QRCodeCanvas value={paymentLink} size={256} /> {/* Use QRCodeCanvas component */}
        </div>
      ) : (
        <p>Click the button to generate a payment link.</p>
      )}
    </div>
  );
};

export default PaymentQRCode;
