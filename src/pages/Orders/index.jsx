import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import { BE_URL } from "../../constants/url";
import { findCountry } from "../../constants";
import "./orders.css";
import BreadCrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/Loader";

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const { language, preset } = findCountry("pakistan");

  React.useEffect(() => {
    setLoading(true);
    fetch(`${BE_URL}/orders/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // .finally(() => setLoading(false));
  }, [setOrders, setLoading]);

  if (loading) return <Loader ring />;

  return (
    <>
      <BreadCrumbs pages={"orders"} />
      {orders?.length ? (
        orders
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((order) => (
            <div className="orders" key={order._id}>
              <div className="cart-container">
                <div className="card-container">
                  <span className="pro">{"PRO"}</span>
                  <ul className="card-details">
                    <li>
                      <h1>{order.name}</h1>
                    </li>
                    <li>
                      <strong>Order Time: </strong>
                      {order.createdAt}
                    </li>
                    <li>
                      <strong>Email: </strong>
                      {order.email}
                    </li>
                    <li>
                      <strong>Phone: </strong>
                      {order.phoneNumber}
                    </li>
                    <li>
                      <strong>Address: </strong>
                      {order.address}
                    </li>
                  </ul>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2">
                        Products
                      </th>
                      <th scope="col">Qty.</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr className="products_data" key={product._id}>
                        <td>
                          <Link
                            to={`/categories/${
                              product.category.toLowerCase() + "/" + product._id
                            }`}
                          >
                            <img src={product.image} alt={product.title} />
                          </Link>
                        </td>
                        <td>
                          <Link
                            abbr={product.title}
                            to={`/categories/${
                              product.category.toLowerCase() + "/" + product._id
                            }`}
                          >
                            {product.title}
                          </Link>
                        </td>
                        <td>{product.quantity}</td>
                        <td>
                          {product.price.toLocaleString(language, preset)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row" colSpan="3">
                        Total Price:
                      </th>
                      <td colSpan="1">
                        {order.total.toLocaleString(language, preset)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <span>
                  <Material.Button
                    // className="btn"
                    variant="contained"
                    color="success"
                  >
                    <Icon.AddShoppingCart />
                    Add to Cart
                  </Material.Button>
                  <Material.Button
                    // className="btn"
                    variant="contained"
                    color="warning"
                  >
                    <Icon.ShoppingBag />
                    Add to Cart
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
