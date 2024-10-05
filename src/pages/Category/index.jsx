import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import ProductContext from "../../Context/ProductContext";
import CartContext from "../../Context/CartContext";
import { capitalized, findCountry, initialScrollTo } from "../../constants";

export default function Category() {
  const { language, preset } = findCountry("pakistan");
  const { category } = useParams();
  const navigate = useNavigate();
  // Product context where all products are stored
  const productContext = React.useContext(ProductContext);
  const { allProducts } = productContext;
  // Cart context to add to cart
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  // Filter products by category
  const filteredProducts = allProducts.filter(
    (item) => item.category.toLowerCase() === category
  );

  React.useEffect(() => {
    if (!allProducts.length) return navigate("/");
    initialScrollTo(0);
  }, []);

  return (
    <>
      <Material.Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginTop: 100, paddingInline: 30 }}
      >
        <Link to={"/"}>Home</Link>
        <Link>{capitalized(category)}</Link>
      </Material.Breadcrumbs>
      <div className="home-container">
        <h1 style={{ textAlign: "center" }}>{capitalized}</h1>
        <div className="container">
          {filteredProducts.map((product) => (
            <div className="products-container" key={product._id}>
              <Link to={`/products/${product._id}`}>
                <div className="products-card">
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </div>
              </Link>
              <span>
                <p>{product.price.toLocaleString(language, preset)}</p>
                <Link to={`/category/${product.category.toLowerCase()}`}>
                  <p>{product.category}</p>
                </Link>
              </span>
              <span>
                <Material.Button
                  className="btn"
                  variant="contained"
                  color="success"
                  onClick={() => addToCart(product)}
                >
                  <Icon.AddShoppingCart />
                  Add to Cart
                </Material.Button>
                <Material.Button
                  className="btn"
                  variant="contained"
                  color="warning"
                  onClick={() => buyNow(product)}
                >
                  <Icon.ShoppingBag />
                  Buy now
                </Material.Button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
