import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import { BE_URL } from "../../constants/url";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import "./product.css";
import EditIcon from "@mui/icons-material/Edit";

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  // Contexts
  const cartContext = React.useContext(CartContext);
  const { addToCart, buyNow } = cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts } = productContext;
  // States
  const [loading, setLoading] = React.useState(false);
  const [singleProduct, setSingleProduct] = React.useState({});
  const [user, setUser] = React.useState(null);
  // Find Single Product From ProductContext
  const fetchSingleProduct = async () => {
    if (!allProducts.length) return navigate("/");
    setLoading(true);
    const findProduct = allProducts.find((product) => product._id === id);
    setSingleProduct(findProduct);
    // const response = await fetch(`${BE_URL}/products/${id}`);
    // const data = await response.json();
    // setSingleProduct(data.product);
    setLoading(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`${BE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data", data);
    navigate("/");
  };

  React.useEffect(() => {
    fetchSingleProduct();
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <>
      <div className="container">
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
          <Link to={`/category/${singleProduct.category?.toLowerCase()}`}>
            {singleProduct.category?.charAt(0).toUpperCase() +
              singleProduct.category?.slice(1)}
          </Link>{" "}
          {" / "}
          <Link>
            {singleProduct.title?.charAt(0).toUpperCase() +
              singleProduct.title?.slice(1)}
          </Link>
        </div>

        <div className="product-flex">
          {loading ? (
            <Material.CircularProgress color="secondary" />
          ) : (
            <>
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
                          onClick={handleDelete}
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
                        onClick={() => buyNow(name)}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
