import { useState, createContext } from "react";

const CartContext = createContext({});

export const CartContainer = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    const existingProduct = cartItems.find(
      (Product) => Product.title === newItem.title
    );
    if (existingProduct) {
      return;
    }
    const items = [...cartItems, newItem];
    setCartItems(items);
  };
  const removeFromCart = (name) => {
    const filteredItems = cartItems.filter((item) => item.title !== name);
    setCartItems(filteredItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
