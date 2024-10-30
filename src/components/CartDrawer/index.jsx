import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import CartContext from "../../Context/CartContext";
import { findCountry } from "../../constants";
import ProductContext from "../../Context/ProductContext";
import "./cart-drawer.css";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { language, preset } = findCountry("pakistan");
  // Contexts
  const cartContext = React.useContext(CartContext);
  const { cartItems, handleQuantity, removeFromCart, total } = cartContext;
  const productContext = React.useContext(ProductContext);
  const { allProducts } = productContext;

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const toggleDrawer = (anchor, open) => () =>
  //   setState({ ...state, [anchor]: open });

  const toggleDrawerNavigate = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    navigate("/checkout");
  };

  const list = (anchor) => (
    <Material.Box
      className="drawer"
      sx={{
        position: "relative",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer-right">
        <div>
          <Material.IconButton onClick={toggleDrawer(anchor, false)}>
            <Icon.Close fontSize="large" color="secondary" />
          </Material.IconButton>
          <Material.IconButton
            onClick={toggleDrawer(anchor, false)}
            color="warning"
          >
            <img src="/svgs/logo.svg" alt="" width={32} height={32} />
            <span
              style={{
                marginLeft: "4px",
                fontSize: "28px",
              }}
            >
              <strong>BQ </strong>Cart
            </span>
          </Material.IconButton>
        </div>
        <Material.IconButton
          className="cart_icon"
          onClick={toggleDrawer(anchor, true)}
        >
          <Material.Badge
            badgeContent={String(cartItems.length)}
            color="secondary"
          >
            <Icon.ShoppingCart fontSize="large" color="secondary" />
          </Material.Badge>
        </Material.IconButton>
      </div>
      <div className="cart_drawer">
        <div className="cart">
          <div className="cart-container">
            {/* <h1>Cart</h1> */}
            {cartItems.length ? (
              <>
                {cartItems.map((product, productIndex) => (
                  <div className="cart-card drawer_card" key={productIndex}>
                    <div className="cart-content">
                      <Link
                        to={`/categories/${
                          product.category.toLowerCase() + "/" + product._id
                        }`}
                      >
                        <img src={product.image} alt={product.title} />
                      </Link>
                      <div className="cart-title">
                        <p>
                          <Link
                            to={`/categories/${
                              product.category.toLowerCase() + "/" + product._id
                            }`}
                          >
                            {product.title}
                          </Link>
                        </p>
                        <p>
                          <Link
                            to={`/categories/${product.category.toLowerCase()}`}
                          >
                            {product.category}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="cart-btns">
                      <div className="quantity-btns">
                        <Material.Button
                          // variant="text"
                          color="warning"
                          onClick={() => handleQuantity(product, -1)}
                        >
                          <Icon.RemoveCircle />
                        </Material.Button>
                        <p className="quantity">{product.quantity}</p>
                        <Material.Button
                          // variant="text"
                          color="success"
                          onClick={() =>
                            handleQuantity(product, 1, allProducts)
                          }
                        >
                          <Icon.AddCircle />
                        </Material.Button>
                      </div>
                      <p>{product.price.toLocaleString(language, preset)}</p>
                      <Material.Button
                        className="remove-item"
                        color="error"
                        onClick={() => removeFromCart(product.title)}
                      >
                        <Icon.RemoveShoppingCart />
                      </Material.Button>
                    </div>
                  </div>
                ))}
                <div className="checkout_note">
                  <Material.TextField
                    // onChange={(e) => handleChange(e, order, setOrder)}
                    // value={data.value}
                    // name={data.name}
                    label="Order note..."
                    variant="filled"
                    color="secondary"
                    placeholder="Insert you note..."
                    fullWidth
                    multiline
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <p className="no_items">Your cart is currently empty.</p>
            )}
          </div>
        </div>
      </div>
      {cartItems.length && (
        <div className="estimated">
          <p className="subtotal">
            {cartItems.length ? (
              <>
                Subtotal
                <span>{total.toLocaleString(language, preset)}</span>
              </>
            ) : (
              <></>
            )}
          </p>
          <p>Shipping, taxes, and discount codes calculated at checkout.</p>
          <Material.Button
            disabled={cartItems.length ? false : true}
            className="cart-btn"
            onClick={toggleDrawerNavigate(anchor, false)}
            variant="contained"
            color="success"
            startIcon={<Icon.ShoppingCartCheckout />}
            size="large"
          >
            Place Order
          </Material.Button>
        </div>
      )}
      {/* <Material.Divider /> */}
    </Material.Box>
  );
  // index % 2 === 0 ? <InboxIcon /> : <MailIcon />

  return (
    <div>
      {["right"].map((anchor) => (
        <div className="header-icon" key={anchor}>
          <Material.IconButton onClick={toggleDrawer(anchor, true)}>
            <Material.Badge
              badgeContent={String(cartItems.length)}
              color="secondary"
            >
              <Icon.ShoppingCart
                fontSize="large"
                style={{ color: "#ffff90" }}
              />
            </Material.Badge>
          </Material.IconButton>
          <Material.SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </Material.SwipeableDrawer>
        </div>
      ))}
    </div>
  );
}
