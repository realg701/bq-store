import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import "./cart.css";
import Button from "@mui/material/Button";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const { cartItems, removeFromCart } = cartContext;
  return (
    <>
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
              <Link to={"/"}>
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  color="warning"
                  size="large"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
