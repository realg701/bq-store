import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(
      "https://fancy-trousers-ox.cyclic.app/products/all"
    );
    const data = await response.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="home">
          {products.map((product, productIndex) => {
            return (
              <Link to={`/products/${product._id}`} key={productIndex}>
                <div className="products-container ">
                  <div className="loading">
                    <img
                      className="products-image"
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <div className="products-title">
                    <p>
                      {product.title} | {product.category}
                    </p>
                    <p>Rs. {product.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
