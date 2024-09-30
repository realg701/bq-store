import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import CircularProgress from "@mui/material/CircularProgress";
import { BE_URL } from "../../constants/url";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function Home() {
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts, setAllProducts } = productContext;
  // const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  console.log(allProducts);
  React.useEffect(() => {
    setLoading(true);
    fetch(`${BE_URL}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        // setProducts(data.products);
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [setAllProducts]);
  return (
    <>
      <div className="home-container">
        <div className="header-image">
          <img
            src="https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg"
            alt="hero image"
          />
        </div>
        <div className="container">
          {loading ? (
            <div className="loading">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              {allProducts.map((product) => (
                <div className="products-container" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <div className="products-card">
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </div>
                  </Link>
                  <span>
                    <p>Rs. {product.price} </p>
                    <Link to={`/category/${product.category.toLowerCase()}`}>
                      <p>{product.category}</p>
                    </Link>
                  </span>
                  <span>
                    <Button
                      className="btn"
                      variant="contained"
                      color="success"
                      onClick={() => addToCart(product)}
                    >
                      <AddShoppingCartIcon />
                      Add to Cart
                    </Button>
                    <Button
                      className="btn"
                      variant="contained"
                      color="warning"
                      onClick={() => buyNow(product)}
                    >
                      <ShoppingBagIcon />
                      Buy now
                    </Button>
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
