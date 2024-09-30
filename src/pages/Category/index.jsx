import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ProductContext from "../../Context/ProductContext";
import CartContext from "../../Context/CartContext";

export default function Category() {
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

  const options = [
    "en-PK",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "PKR",
    },
  ];

  React.useEffect(() => {
    if (!allProducts.length) navigate("/");
  }, []);

  return (
    <>
      <div className="home-container">
        <div
          className="header-image"
          style={{ marginTop: 100, paddingInline: 30 }}
        >
          {/* <img
            src="https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg"
            alt="hero image"
          /> */}
          <Link to={"/"}>Home</Link>
          {" / "}
          <Link>{category.charAt(0).toUpperCase() + category.slice(1)}</Link>
        </div>
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
                <p>{product.price.toLocaleString(options[0], options[1])} </p>
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
        </div>
      </div>
    </>
  );
}
