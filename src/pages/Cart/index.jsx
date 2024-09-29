import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import "./cart.css";
import Button from "@mui/material/Button";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoginIcon from "@mui/icons-material/Login";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Cart() {
  const navigate = useNavigate();
  const cartContext = React.useContext(CartContext);
  const { cartItems, handleQuantity, removeFromCart } = cartContext;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(cartItems);

  return (
    <div className="cart">
      <h1>Cart Items</h1>
      {cartItems.length ? (
        <div className="cart-container">
          {cartItems.map((item, itemIndex) => (
            <div className="cart-card" key={itemIndex}>
              <Link to={`/products/${item._id}`} className="cart-content">
                <img src={item.image} alt={item.title} />
                <div className="cart-title">
                  <p>{item.title}</p>
                  <p>Category: {item.category}</p>
                </div>
              </Link>
              <div className="cart-btns">
                <div className="quantity-btns">
                  <Button
                    variant="text"
                    color="warning"
                    onClick={() => handleQuantity(item, -1)}
                  >
                    <RemoveCircleIcon />
                  </Button>
                  <p>
                    Qty. {item.quantity} | Rs. {item.price}
                  </p>
                  <Button
                    variant="text"
                    color="success"
                    onClick={() => handleQuantity(item, 1)}
                  >
                    <AddCircleIcon />
                  </Button>
                </div>
                <Button
                  className="remove-item"
                  variant="contained"
                  color="error"
                  onClick={() => removeFromCart(item.title)}
                >
                  <RemoveShoppingCartIcon />
                </Button>
              </div>
            </div>
          ))}
          {user ? (
            <Button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon />}
              color="warning"
              size="large"
            >
              Checkout
            </Button>
          ) : (
            <Button
              className="checkout-btn"
              onClick={() => navigate("/login")}
              variant="contained"
              startIcon={<LoginIcon />}
              color="warning"
              size="large"
            >
              Please Login
            </Button>
          )}
        </div>
      ) : (
        <div className="cart-container">
          <p>No items in Cart</p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            startIcon={<HomeIcon />}
            color="warning"
            size="large"
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
