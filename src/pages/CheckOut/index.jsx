import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import { handleSubmit } from "../../libs/actions/checkout.actions";
import { findCountry, initialScrollTo } from "../../constants";
import "./checkout.css";

const CheckOut = () => {
  const { language, preset } = findCountry("pakistan");
  const navigate = useNavigate();
  const cartContext = React.useContext(CartContext);
  const productContext = React.useContext(ProductContext);
  const { allProducts } = productContext;
  const { cartItems, setCartItems, handleQuantity, removeFromCart, total } =
    cartContext;
  const token = JSON.parse(localStorage.getItem("token"));
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
    { value: order.name, name: "name", label: "Name" },
    {
      value: order.phoneNumber,
      name: "phoneNumber",
      label: "Phone no.",
    },
    {
      value: order.address,
      name: "address",
      label: "Address",
    },
    { value: order.email, name: "email", label: "Email" },
  ];

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOrder(() => {
      return { ...order, [name]: value };
    });
  };

  const userData = {
    token: token,
    name: order.name,
    phoneNumber: order.phoneNumber,
    address: order.address,
    email: order.email,
    total: total,
    products: cartItems.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category,
        seller: item.seller,
        quantity: item.quantity,
      };
    }),
  };

  React.useEffect(() => {
    initialScrollTo(0);
  }, []);

  return (
    <>
      <Material.Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginTop: 100, paddingInline: 30 }}
      >
        <Link to={"/"}>Home</Link>
        <Link>Cart</Link>
      </Material.Breadcrumbs>
      {loading ? (
        <div className="cart">
          <div
            className="cart-container"
            style={{
              alignItems: "center",
            }}
          >
            <h1>Loading...</h1>
            <Material.CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <>
          {cartItems.length ? (
            <>
              <div className="cart" style={{ marginBottom: 0 }}>
                <div className="cart-container">
                  <h1>Place Order</h1>
                  {checkOutTextField.map((data, index) => (
                    <div className="cart-card checkout-card" key={index}>
                      <Material.TextField
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
                  <Material.Button
                    className="checkout-btn scroll-down"
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<Icon.KeyboardDoubleArrowDown />}
                    onClick={() => initialScrollTo(window.screen.height + 600)}
                  >
                    Scroll Down
                  </Material.Button>
                </div>
              </div>
              <div className="cart checkout" style={{ marginTop: 0 }}>
                <div className="cart-container">
                  <h1>Cart Items</h1>
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
                          <Link to={`/category/${item.category.toLowerCase()}`}>
                            <p>
                              <Icon.Class fontSize="small" />
                              {item.category}
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="cart-btns">
                        <div className="quantity-btns">
                          <Material.Button
                            variant="text"
                            color="warning"
                            onClick={() => handleQuantity(item, -1)}
                          >
                            <Icon.RemoveCircle />
                          </Material.Button>
                          <p>
                            Qty. {item.quantity} |{" "}
                            {(item.price * item.quantity).toLocaleString(
                              language,
                              preset
                            )}
                          </p>
                          <Material.Button
                            variant="text"
                            color="success"
                            onClick={() => handleQuantity(item, 1, allProducts)}
                          >
                            <Icon.AddCircle />
                          </Material.Button>
                        </div>
                        <Material.Button
                          className="remove-item"
                          color="error"
                          onClick={() => removeFromCart(item.title)}
                        >
                          <Icon.RemoveShoppingCart />
                        </Material.Button>
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
                    <Material.Button
                      disabled={loading}
                      className="checkout-btn"
                      onClick={() =>
                        handleSubmit(
                          userData,
                          setOpen,
                          setLoading,
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
                    </Material.Button>
                  ) : (
                    <Material.Button
                      className="checkout-btn"
                      onClick={() => navigate("/login")}
                      variant="contained"
                      startIcon={<Icon.Login />}
                      color="warning"
                      size="large"
                    >
                      Please Login
                    </Material.Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="cart">
              <div className="cart-container">
                <h1>Cart Items</h1>
                <p>{message}</p>
                <Material.Button
                  className="checkout-btn"
                  onClick={() => navigate("/")}
                  variant="contained"
                  startIcon={<Icon.Home />}
                  color="warning"
                  size="large"
                >
                  Back to Home
                </Material.Button>
              </div>
            </div>
          )}
        </>
      )}
      <Material.Snackbar
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
      </Material.Snackbar>
    </>
  );
};

export default CheckOut;
