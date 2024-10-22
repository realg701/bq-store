import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AddShoppingCart, ShoppingBag } from "@mui/icons-material";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import { BE_URL } from "../../constants/url";
import { findCountry } from "../../constants";
import Loader from "../../components/Loader";
import "./home.css";

export default function Home() {
  const { language, preset } = findCountry("pakistan");
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts, setProductsGlobally } = productContext;
  // Loading State to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(`${BE_URL}/products/all`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setProductsGlobally(data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") console.log("Cancelled!");
        else console.log(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [setIsLoading]);

  if (isLoading) return <Loader ring />;

  return (
    <>
      <div className="home-container">
        <div className="header-image">
          <img src="/images/ecommerce-banner.jpg" alt="ecommerce banner" />
        </div>
        <div className="container">
          {allProducts.length ? (
            allProducts
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
                      <Link
                        to={`/categories/${product.category.toLowerCase()}`}
                      >
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
              ))
          ) : (
            <Loader ring top={"100px"} />
          )}
        </div>
      </div>
    </>
  );
}
