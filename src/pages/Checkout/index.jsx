import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { BE_URL } from "../../constants/url";
import CartContext from "../../Context/CartContext";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import "./checkout.css";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const CheckOut = () => {
  const navigate = useNavigate();
  const cartContext = React.useContext(CartContext);
  const { cartItems, setCartItems, handleQuantity, removeFromCart } =
    cartContext;
  // const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("No items in Cart");
  const [order, setOrder] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const checkOutTextField = [
    { value: user?.userName || order.name, name: "name", label: "Name" },
    {
      value: user?.phoneNumber || order.phoneNumber,
      name: "phoneNumber",
      label: "Phone no.",
    },
    {
      value: user?.address || order.address,
      name: "address",
      label: "Address",
    },
    { value: user?.email || order.email, name: "email", label: "Email" },
  ];

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOrder(() => {
      return { ...order, [name]: value };
    });
  };

  const productData = cartItems.map((item) => {
    return {
      id: item._id,
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category,
      seller: item.seller,
      quantity: item.quantity,
    };
  });

  const handleSubmit = async () => {
    if (!order.name || !order.phoneNumber || !order.address || !order.email)
      return setOpen(true);
    setLoading(true);
    fetch(`${BE_URL}/orders/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: order.name,
        phoneNumber: order.phoneNumber,
        address: order.address,
        email: order.email,
        products: productData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("CheckOut:", data);
        if (data.status === "success") {
          setCartItems([]);
          setMessage("Order Placed Successfully");
          setLoading(false);
        }
        if (data.status === "error") {
          setLoading(false);
        }
        if (data.status === "empty") {
          setMessage("Your Cart Is Empty");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const goToBottom = () => {
    window.scrollTo({
      top: window.screen.height,
      behavior: "smooth",
    });
  };

  return (
    <>
      {loading ? (
        <div className="cart">
          <h1>Loading...</h1>
          <div
            className="cart-container"
            style={{
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <>
          {cartItems.length ? (
            <>
              <div className="cart" style={{ marginBottom: 0 }}>
                <h1>Cart Items</h1>
                <div className="cart-container">
                  <Button
                    className="checkout-btn scroll-down"
                    variant="contained"
                    size="large"
                    color="info"
                    startIcon={<ExpandCircleDownIcon />}
                    onClick={goToBottom}
                  >
                    Scroll Down
                  </Button>

                  {cartItems.map((item, itemIndex) => (
                    <div className="cart-card" key={itemIndex}>
                      <div className="cart-content">
                        <Link to={`/products/${item._id}`}>
                          <img src={item.image} alt={item.title} />
                        </Link>
                        <div className="cart-title">
                          <Link to={`/products/${item._id}`}>
                            <p>{item.title}</p>
                          </Link>

                          <p>
                            Category:{" "}
                            <Link
                              to={`/products/${item.category.toLowerCase()}`}
                            >
                              {item.category}
                            </Link>
                          </p>
                        </div>
                      </div>
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
                          // variant="contained"
                          color="error"
                          onClick={() => removeFromCart(item.title)}
                        >
                          <RemoveShoppingCartIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart checkout" style={{ marginTop: 0 }}>
                <h1>Place Order</h1>
                <div className="cart-container">
                  {checkOutTextField.map((data, index) => (
                    <div className="cart-card checkout-card" key={index}>
                      <TextField
                        required
                        value={data.value}
                        onChange={handleChange}
                        name={data.name}
                        label={data.label}
                        variant="filled"
                        color="secondary"
                      />
                    </div>
                  ))}
                  {user ? (
                    <Button
                      className="checkout-btn"
                      onClick={handleSubmit}
                      variant="contained"
                      color="success"
                      startIcon={<AddIcon />}
                      size="large"
                    >
                      Order Submit
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
              </div>
            </>
          ) : (
            <div className="cart">
              <h1>Cart Items</h1>
              <div className="cart-container">
                <p>{message}</p>
                <Button
                  className="checkout-btn"
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
          )}
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Empty Fields!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckOut;
