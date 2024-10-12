import React from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import LoaderContext from "../../Context/LoaderContext";
import { Box, Button } from "@mui/material";
import { AddShoppingCart, ShoppingBag } from "@mui/icons-material";
import { BE_URL } from "../../constants/url";
import { findCountry } from "../../constants";
import Loader from "../../components/Loader";
import "./home.css";

export default function Home() {
  const { language, preset } = findCountry("pakistan");
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts, setAllProducts } = productContext;
  const loaderContext = React.useContext(LoaderContext);
  const { loading, setLoading } = loaderContext;

  React.useEffect(() => {
    setLoading(true);
    fetch(`${BE_URL}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setAllProducts, setLoading]);

  if (loading) return <Loader ring={true} />;

  return (
    <>
      <div className="home-container">
        <div className="header-image">
          <img src="/images/ecommerce-banner.jpg" alt="ecommerce banner" />
        </div>
        <div className="container">
          {allProducts
            .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
            .map((product) => (
              <div className="products-container" key={product._id}>
                <Box paddingInline={1}>
                  <Link
                    to={`/categories/${
                      product.category.toLowerCase() + "/" + product._id
                    }`}
                  >
                    <div className="products-card">
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </div>
                  </Link>
                  <span>
                    <p>{product.price.toLocaleString(language, preset)}</p>
                    <Link to={`/categories/${product.category.toLowerCase()}`}>
                      <p>{product.category}</p>
                    </Link>
                  </span>
                </Box>
                <span>
                  <Button
                    className="btn"
                    variant="contained"
                    color="success"
                    onClick={() => addToCart(product)}
                  >
                    <AddShoppingCart />
                    Add to Cart
                  </Button>
                  <Button
                    className="btn"
                    variant="contained"
                    color="warning"
                    onClick={() => buyNow(product)}
                  >
                    <ShoppingBag />
                    Buy now
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
