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

  const handleQuantity = (p, value) => {
    let product = cartItems.find((pr) => pr.title === p.title);
    product.quantity += value;
    if (product.quantity < 1) product.quantity = 1;
    const updatedProducts = cartItems.map((p) => {
      if (product.title === p.title) return product;
      return p;
    });
    setCartItems(updatedProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleQuantity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
