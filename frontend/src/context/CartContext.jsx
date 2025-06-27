// CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = cartItems.length; // ✅ number of distinct items

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
