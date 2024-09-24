import React from "react";
import { useNavigate } from "react-router";
import "./checkout.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { BE_URL } from "../../constants/url";
import CartContext from "../../Context/CartContext";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";

const CheckOut = () => {
  const navigate = useNavigate();
  const cartContext = React.useContext(CartContext);
  const { cartItems } = cartContext;
  // const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [order, setOrder] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOrder(() => {
      return { ...order, [name]: value };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    fetch(`${BE_URL}/orders/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: cartItems,
        name: order.name,
        phoneNumber: order.phoneNumber,
        address: order.address,
        email: order.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Apply:", data);
        if (data.status === "success") {
          console.log("Registered successfully");
          setLoading(false);
        }
        if (data.status === "error") {
          console.log("Try a different username or email");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container">
        <div className="add-flex">
          <div className="add-container">
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {user ? (
                  <Container className="input-container">
                    <h3>Order Product</h3>
                    <TextField
                      required
                      fullWidth
                      value={order.name}
                      onChange={handleChange}
                      name="name"
                      label="Name"
                      variant="outlined"
                      className="text-field"
                    />
                    <TextField
                      required
                      fullWidth
                      value={order.phoneNumber}
                      onChange={handleChange}
                      name="phoneNumber"
                      label="Phone no."
                      variant="outlined"
                      className="text-field"
                    />
                    <TextField
                      required
                      fullWidth
                      value={order.address}
                      onChange={handleChange}
                      name="address"
                      label="Address"
                      variant="outlined"
                      className="text-field"
                    />
                    <TextField
                      required
                      fullWidth
                      value={order.email}
                      onChange={handleChange}
                      name="email"
                      label="Email"
                      variant="outlined"
                      className="text-field"
                      multiline
                      maxRows={4}
                    />
                    <Button
                      fullWidth
                      onClick={handleSubmit}
                      variant="contained"
                      color="success"
                      className="add-btn"
                      startIcon={<AddIcon />}
                    >
                      Order Submit
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={5000}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                      >
                        Empty Field!
                      </Alert>
                    </Snackbar>
                  </Container>
                ) : (
                  <>
                    {" "}
                    {cartItems.length ? (
                      cartItems.map((item, itemIndex) => (
                        <div className="cart-flex" key={itemIndex}>
                          <div className="cart-container">
                            <Link to={`/products/${item._id}`}>
                              <div className="cart-content">
                                <img
                                  className="cart-image"
                                  src={item.image}
                                  alt={item.title}
                                />
                                <div className="cart-title">
                                  <p>{item.title}</p>
                                  <span className="saperater-min">|</span>
                                  <p>
                                    Qty. {(item.qty, 3)} | Rs. {item.price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {user ? (
                          <>
                            <Button
                              onClick={() => navigate("/")}
                              variant="contained"
                              startIcon={<HomeIcon />}
                              color="warning"
                              size="large"
                            >
                              Back to home
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
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
