import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import { BE_URL } from "../../constants/url";
import { findCountry } from "../../constants";
import "./orders.css";

const Orders = () => {
  const { language, preset } = findCountry("pakistan");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  console.log(orders);
  React.useEffect(() => {
    setLoading(true);
    fetch(`${BE_URL}/orders/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setOrders]);

  return (
    <>
      <Material.Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginTop: 100, paddingInline: 30 }}
      >
        <Link to={"/"}>Home</Link>
        <Link>Orders</Link>
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
      ) : orders?.length ? (
        orders
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((item) => (
            <div className="orders" key={item._id}>
              <div className="cart-container">
                <h1>{item.name}</h1>
                <h3>Order Time: {item.createdAt}</h3>
                <div className="user_details">
                  <p>Name: {item.name}</p>
                  <p>Phone: {item.phoneNumber}</p>
                  <p>Email: {item.email}</p>
                  <p>Total: {item.total?.toLocaleString(language, preset)}</p>
                  <p>Address: {item.address}</p>
                </div>
                <h2>Products</h2>
                <div className="products_details">
                  {item.products.map((product) => (
                    <div className="products-container" key={product._id}>
                      <Link to={`/products/${product._id}`}>
                        <div className="products-card">
                          <img src={product.image} alt={product.title} />
                          <p>{product.title}</p>
                        </div>
                      </Link>
                      <span>
                        <p>{product.price.toLocaleString(language, preset)}</p>
                        <Link
                          to={`/category/${product.category.toLowerCase()}`}
                        >
                          <p>{product.category}</p>
                        </Link>
                      </span>
                      <span>
                        <p>Quantity: {product.quantity}</p>
                        <p>
                          {(product.quantity * product.price).toLocaleString(
                            language,
                            preset
                          )}
                        </p>
                      </span>
                    </div>
                  ))}
                </div>
                <span>
                  <Material.Button
                    className="btn"
                    variant="contained"
                    color="success"
                  >
                    <Icon.AddShoppingCart />
                    Add to Cart
                  </Material.Button>
                  <Material.Button
                    className="btn"
                    variant="contained"
                    color="warning"
                  >
                    <Icon.ShoppingBag />
                    Buy now
                  </Material.Button>
                </span>
              </div>
            </div>
          ))
      ) : (
        <div className="cart">
          <div className="cart-container">
            <h1>Orders</h1>
            <p>No orders available</p>
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
  );
};

export default Orders;
