import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import CartContext from "../../../Context/CartContext";
import { capitalized, findCountry, initialScrollTo } from "../../../constants";
import { BE_URL } from "../../../constants/url";
import BreadCrumbs from "../../../components/Breadcrumbs";
import Loader from "../../../components/Loader";
import My404 from "../../../components/My404";
import "../category.css";

export default function Category() {
  const { language, preset } = findCountry("pakistan");
  const { category } = useParams();
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  // Loading State to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFound, setIsFound] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(`${BE_URL}/products/all/categories/${category}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.products.length) setIsFound(false);
        else setFilteredProducts(data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") console.log("Cancelled!");
        console.log(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    initialScrollTo(0);
  }, []);

  if (!isFound) return <My404 />;

  return (
    <>
      <BreadCrumbs pages={"categories/" + category} />
      <div className="category-container">
        <h1 style={{ textAlign: "center" }}>{capitalized(category)}</h1>
        <Material.Box paddingInline={2}>
          <Material.Typography textAlign={"center"}>
            Shop a wide selection of {capitalized(category)} in Pakistan at
            <Link to={"/"}> BQ Store.</Link>
          </Material.Typography>
        </Material.Box>
        <div className="container">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div className="products-container" key={product._id}>
                <Material.Box paddingInline={1}>
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
                </Material.Box>
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
            ))
          ) : (
            <Loader ring top={"100px"} />
          )}
        </div>
      </div>
    </>
  );
}
