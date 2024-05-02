import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import "./cart.css";
import Button from "@mui/material/Button";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoginIcon from "@mui/icons-material/Login";

export default function Cart() {
  const navigate = useNavigate();

  const cartContext = useContext(CartContext);
  const { cartItems, removeFromCart } = cartContext;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(cartItems);
  return (
    <>
      <div className="container">
        {cartItems.length ? (
          cartItems.map((item, itemIndex) => (
            <div className="cart-flex" key={itemIndex}>
              <div className="cart-container">
                <Link to={`/products/${item._id}`}>
                  <div className="cart-content">
                    <img className="cart-image" src={item.image} alt="" />
                    <div className="cart-title">
                      <p>{item.title}</p>
                      <span className="saperater-min">|</span>
                      <p>
                        Qty. {(item.qty, 3)} | Rs. {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="cart-btn">
                  <div>
                    <span className="saperater-min">
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<RemoveShoppingCartIcon />}
                        className="remove-from-cart remove-min"
                        onClick={() => removeFromCart(item.title)}
                      >
                        Remove
                      </Button>
                    </span>
                    <span className="saperater-max">
                      <Button
                        variant="contained"
                        color="error"
                        className="remove-from-cart remove-max"
                        onClick={() => removeFromCart(item.title)}
                      >
                        <RemoveShoppingCartIcon />
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="cart-flex">
            <div className="cart-non-container">
              <div className="cart-non-title">
                <p>No items in Cart</p>
              </div>
              <div className="cart-non-title home-btn">
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
            </div>
          </div>
        )}
        {cartItems.length ? (
          <div className="cart-flex">
            <div className="cart-non-container">
              <div className="cart-non-title home-btn">
                {user ? (
                  <>
                    <Button
                      onClick={() => navigate("/checkout")}
                      variant="contained"
                      startIcon={<ShoppingCartCheckoutIcon />}
                      color="warning"
                      size="large"
                    >
                      Checkout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="contained"
                      startIcon={<LoginIcon />}
                      color="warning"
                      size="large"
                    >
                      Please Login
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
