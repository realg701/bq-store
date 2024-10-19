import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import * as Icon from "@mui/icons-material";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import {
  checkOutTextFieldSet,
  handleChange,
  handleClose,
  handleSubmit,
  userDataSet,
} from "../../libs/actions/checkout.actions";
import { findCountry, initialScrollTo } from "../../constants";
import BreadCrumbs from "../../components/Breadcrumbs";
import "./checkout.css";

const CheckOut = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const { language, preset } = findCountry("pakistan");
  // Contexts
  const cartContext = React.useContext(CartContext);
  const { cartItems, setCartItems, handleQuantity, removeFromCart, total } =
    cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts } = productContext;
  // Loading State to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("No items in Cart");
  const [order, setOrder] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const checkOutTextField = checkOutTextFieldSet(order);
  const userData = userDataSet(token, order, total, cartItems);

  React.useEffect(() => {
    initialScrollTo(0);
    const userInput = JSON.parse(localStorage.getItem("userInput"));
    if (userInput) {
      const { name, phoneNumber, address, email } = userInput;
      return setOrder({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });
    }
  }, []);

  if (isLoading)
    return (
      <>
        <BreadCrumbs pages={"Cart"} />
        <div className="cart">
          <div
            className="cart-container"
            style={{
              alignItems: "center",
            }}
          >
            <h1>Loading...</h1>
            <CircularProgress color="secondary" />
          </div>
        </div>
      </>
    );

  return (
    <>
      <BreadCrumbs pages={"Cart"} />
      {cartItems.length ? (
        <>
          <div className="cart" style={{ marginBottom: 0 }}>
            <div className="cart-container">
              <h1>Place Order</h1>
              {checkOutTextField.map((data, index) => (
                <div className="cart-card checkout-card" key={index}>
                  <TextField
                    required
                    value={data.value}
                    onChange={(e) => handleChange(e, order, setOrder)}
                    name={data.name}
                    label={data.label}
                    variant="filled"
                    color="secondary"
                  />
                </div>
              ))}
              <Button
                className="checkout-btn scroll-down"
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<Icon.KeyboardDoubleArrowDown />}
                onClick={() => initialScrollTo(window.screen.height + 600)}
              >
                Scroll Down
              </Button>
            </div>
          </div>
          <div className="cart checkout" style={{ marginTop: 0 }}>
            <div className="cart-container">
              <h1>Cart Items</h1>
              {cartItems.map((product, productIndex) => (
                <div className="cart-card" key={productIndex}>
                  <div className="cart-content">
                    <Link
                      to={`/categories/${
                        product.category.toLowerCase() + "/" + product._id
                      }`}
                    >
                      <img src={product.image} alt={product.title} />
                    </Link>
                    <div className="cart-title">
                      <Link
                        to={`/categories/${
                          product.category.toLowerCase() + "/" + product._id
                        }`}
                      >
                        <p>{product.title}</p>
                      </Link>
                      <Link
                        to={`/categories/${product.category.toLowerCase()}`}
                      >
                        <p>
                          <Icon.Class fontSize="small" />
                          {product.category}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="cart-btns">
                    <div className="quantity-btns">
                      <Button
                        variant="text"
                        color="warning"
                        onClick={() => handleQuantity(product, -1)}
                      >
                        <Icon.RemoveCircle />
                      </Button>
                      <p>
                        Qty. {product.quantity} |{" "}
                        {(product.price * product.quantity).toLocaleString(
                          language,
                          preset
                        )}
                      </p>
                      <Button
                        variant="text"
                        color="success"
                        onClick={() => handleQuantity(product, 1, allProducts)}
                      >
                        <Icon.AddCircle />
                      </Button>
                    </div>
                    <Button
                      className="remove-item"
                      color="error"
                      onClick={() => removeFromCart(product.title)}
                    >
                      <Icon.RemoveShoppingCart />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="estimated">
                <p>
                  Estimated total:{" "}
                  <span>{total.toLocaleString(language, preset)}</span>
                </p>
              </div>
              {user ? (
                <Button
                  disabled={isLoading}
                  className="checkout-btn"
                  onClick={() =>
                    handleSubmit(
                      userData,
                      setOpen,
                      setIsLoading,
                      setCartItems,
                      setMessage
                    )
                  }
                  variant="contained"
                  color="success"
                  startIcon={<Icon.ShoppingCartCheckout />}
                  size="large"
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  className="checkout-btn"
                  onClick={() => navigate("/login")}
                  variant="contained"
                  startIcon={<Icon.Login />}
                  color="warning"
                  size="large"
                >
                  Please Login
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="cart">
          <div className="cart-container">
            <h1>Cart Items</h1>
            <p>{message}</p>
            <Button
              className="checkout-btn"
              onClick={() => navigate("/")}
              variant="contained"
              startIcon={<Icon.Home />}
              color="warning"
              size="large"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={(e, reason) => handleClose(e, reason, setOpen)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={(e, reason) => handleClose(e, reason, setOpen)}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Empty Fields!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckOut;
