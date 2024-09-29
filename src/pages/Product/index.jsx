import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import ProductContext from "../../Context/ProductContext";
import "./product.css";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import { BE_URL } from "../../constants/url";

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
        <div className="product-flex">
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <div className="product-container">
                <img
                  className="product-image"
                  src={singleProduct.image}
                  alt=""
                />
                <div className="product-title">
                  {user ? (
                    <div className="product-btn">
                      <abbr title="Edit Product">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => navigate(`/products/edit/${id}`)}
                        >
                          Edit Product
                        </Button>
                      </abbr>
                      <abbr title="Delete Product">
                        <Button
                          variant="contained"
                          color="error"
                          endIcon={<DeleteForeverIcon />}
                          onClick={handleDelete}
                        >
                          Delete Product
                        </Button>
                      </abbr>
                    </div>
                  ) : (
                    <></>
                  )}
                  <p>{singleProduct.title}</p>
                  <p>Seller: {singleProduct.seller}</p>
                  <p>Category: {singleProduct.category}</p>
                  <p>Rs. {singleProduct.price}</p>
                  <div className="product-btn">
                    <abbr title="Add to Cart">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(singleProduct)}
                      >
                        Add to Cart
                      </Button>
                    </abbr>
                    <abbr title="Buy Now">
                      <Button
                        variant="contained"
                        color="warning"
                        endIcon={<ShoppingBagIcon />}
                        onClick={() => buyNow(name)}
                      >
                        Buy now
                      </Button>
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
