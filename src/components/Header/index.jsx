import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";

export default function Header() {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  return (
    <>
      <div className="header">
        <div>
          <IconButton>
            <MenuIcon fontSize="large" style={{ color: "#ffffff90" }} />
          </IconButton>
          <IconButton>
            <Link to={"/"}>
              <HomeIcon fontSize="large" style={{ color: "#ffffff90" }} />
            </Link>
          </IconButton>
        </div>
        <div>
          <IconButton>
            <Dashboard />
          </IconButton>
          <Link to={"/cart"}>
            <IconButton>
              <Badge badgeContent={String(cartItems.length)} color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>
    </>
  );
}
