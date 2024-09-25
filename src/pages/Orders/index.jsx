import React from "react";
import { BE_URL } from "../../constants/url";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  console.log(orders.products);
  React.useEffect(() => {
    fetch(`${BE_URL}/orders/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orders);
        setOrders(data.orders);
      });
  }, []);

  return (
    <div className="orders-container">
      {orders.map((item, index) => (
        <div className="orders-card" key={index}>
          <p>{item.address}</p>
          <p>{item.name}</p>
          <p> {item.phoneNumber}</p>
          <p> {item.email}</p>
          <div>
            {item.products.map((product, inex) => (
              <div key={index}>
                <h2>{product.title}</h2>
                <div>{product.category}</div>
                <img src={product.image} alt="" width={100} height={100} />
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
