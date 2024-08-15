import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import CircularProgress from "@mui/material/CircularProgress";
import { BE_URL } from "../../constants/url";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(`${BE_URL}/products/all`);
    const data = await response.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="home-container">
        <div className="header-image">
          <img
            src="https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg"
            alt=""
          />
        </div>
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
                    <img
                      className="products-image"
                      src={product.image}
                      alt={product.title}
                    />
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
      </div>
    </>
  );
}
