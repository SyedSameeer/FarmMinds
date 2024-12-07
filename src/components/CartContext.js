import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.name === product.name);

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1; // Increment quantity
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]); // Add new product with quantity 1
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.name !== product.name)); // Remove product from cart
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
