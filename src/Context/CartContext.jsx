import { useState, createContext } from "react";
import { useNavigate } from "react-router";

const CartContext = createContext({});

export const CartContainer = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    const existingProduct = cartItems.find(
      (Product) => Product.title === newItem.title
    );
    if (existingProduct) return;
    if (!newItem.quantity || newItem.quantity < 1) newItem.quantity = 1;
    const items = [...cartItems, newItem];
    setCartItems(items);
  };

  const buyNow = (newItem) => {
    if (!newItem.quantity || newItem.quantity < 1) newItem.quantity = 1;
    setCartItems([newItem]);
    return navigate("/checkout");
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

  const handleEstimated = (pr) => pr.price * pr.quantity;

  const total = cartItems.reduce((sum, i) => (sum += i.quantity * i.price), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleQuantity,
        addToCart,
        buyNow,
        removeFromCart,
        handleEstimated,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
