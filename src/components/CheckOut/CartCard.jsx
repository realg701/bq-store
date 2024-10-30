import {
  AddCircle,
  Class,
  RemoveCircle,
  RemoveShoppingCart,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { findCountry } from "../../constants";
import { Button } from "@mui/material";

const CartCard = ({ product, cartCardProps }) => {
  const { language, preset } = findCountry("pakistan");
  const { allProducts, handleQuantity, removeFromCart } = cartCardProps;

  return (
    <div className="cart-card">
      <div className="cart-content">
        <Link
          to={`/categories/${
            product.category.toLowerCase() + "/" + product._id
          }`}
        >
          <img src={product.image} alt={product.title} />
        </Link>
        <div className="cart-title">
          <Link
            to={`/categories/${
              product.category.toLowerCase() + "/" + product._id
            }`}
          >
            <p>{product.title}</p>
          </Link>
          <Link to={`/categories/${product.category.toLowerCase()}`}>
            <p>
              <Class fontSize="small" />
              {product.category}
            </p>
          </Link>
        </div>
      </div>
      <div className="cart-btns">
        <div className="quantity-btns">
          <Button
            variant="text"
            color="warning"
            onClick={() => handleQuantity(product, -1)}
          >
            <RemoveCircle />
          </Button>
          <p>
            Qty. {product.quantity} |{" "}
            {(product.price * product.quantity).toLocaleString(
              language,
              preset
            )}
          </p>
          <Button
            variant="text"
            color="success"
            onClick={() => handleQuantity(product, 1, allProducts)}
          >
            <AddCircle />
          </Button>
        </div>
        <Button
          className="remove-item"
          color="error"
          onClick={() => removeFromCart(product.title)}
        >
          <RemoveShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
