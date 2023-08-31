import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";
import Drawer from "../Drawer";

export default function Header() {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  return (
    <>
      <div className="header">
        <div className="left-icon">
          <Drawer />
          <Link to={"/"}>
            <IconButton>
              <HomeIcon fontSize="large" style={{ color: "#ffff90" }} />
              <span
                style={{
                  color: "#ffff90",
                  marginLeft: "10px",
                  fontSize: "28px",
                }}
              >
                <strong>BQ</strong> Store
              </span>
            </IconButton>
          </Link>
        </div>
        <div className="left-icon">
          <Dashboard />
          <Link to={"/cart"}>
            <IconButton>
              <Badge badgeContent={String(cartItems.length)} color="secondary">
                <ShoppingCartIcon
                  fontSize="large"
                  style={{ color: "#ffff90" }}
                />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>
    </>
  );
}
