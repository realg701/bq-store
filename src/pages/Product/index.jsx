import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import { BE_URL } from "../../constants/url";
import CartContext from "../../Context/CartContext";
import Loader from "../../components/Loader";
import My404 from "../../components/My404";
import BreadCrumbs from "../../components/Breadcrumbs";
import { handleDelete } from "../../libs/actions/product.actions";
import "./product.css";

export default function Product() {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  // Context
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  // Loading State to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);
  // Single Product State to set product data
  const [singleProduct, setSingleProduct] = React.useState({});
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(`${BE_URL}/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data.product);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error:", error.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [id, setSingleProduct, setIsLoading]);

  React.useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) setUser(isUser);
  }, []);

  if (!singleProduct) return <My404 />;
  if (isLoading) return <Loader ring />;

  return (
    <>
      {singleProduct.image ? (
        <>
          <BreadCrumbs
            pages={"categories/" + category}
            title={singleProduct.title}
          />
          <div className="container">
            <div className="product-flex">
              <div className="product-container">
                <img
                  className="product-image"
                  src={singleProduct.image}
                  alt=""
                />
                <div className="product-title">
                  {user && (
                    <div className="product-btn">
                      <abbr title="Edit Product">
                        <Material.Button
                          variant="contained"
                          color="primary"
                          startIcon={<Icon.Edit />}
                          onClick={() => navigate(`/products/edit/${id}`)}
                        >
                          Edit Product
                        </Material.Button>
                      </abbr>
                      <abbr title="Delete Product">
                        <Material.Button
                          variant="contained"
                          color="error"
                          endIcon={<Icon.DeleteForever />}
                          onClick={() => handleDelete(id, token, navigate)}
                        >
                          Delete Product
                        </Material.Button>
                      </abbr>
                    </div>
                  )}
                  <p>{singleProduct.title}</p>
                  <p>Seller: {singleProduct.seller}</p>
                  <p>Category: {singleProduct.category}</p>
                  <p>Rs. {singleProduct.price}</p>
                  <div className="product-btn">
                    <abbr title="Add to Cart">
                      <Material.Button
                        variant="contained"
                        color="success"
                        startIcon={<Icon.AddShoppingCart />}
                        onClick={() => addToCart(singleProduct)}
                      >
                        Add to Cart
                      </Material.Button>
                    </abbr>
                    <abbr title="Buy Now">
                      <Material.Button
                        variant="contained"
                        color="warning"
                        endIcon={<Icon.ShoppingBag />}
                        onClick={() => buyNow(singleProduct)}
                      >
                        Buy now
                      </Material.Button>
                    </abbr>
                  </div>
                </div>
              </div>
              <div className="product-description product-flex product-container">
                <h3>Product description.</h3>
                <p>{singleProduct.description}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader ring />
      )}
    </>
  );
}
