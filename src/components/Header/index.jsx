import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import Drawer from "../Drawer";
import Dashboard from "../Dashboard";
import { Badge, IconButton } from "@mui/material";
import { Login, ShoppingCart } from "@mui/icons-material";
import "./Header.css";
import CartDrawer from "../CartDrawer";

const withouSidebarRoutes = ["<routes>"];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  // const cartContext = useContext(CartContext);
  // const { cartItems } = cartContext;
  // Validates if the current pathname includes one the routes you want to hide the sidebar is present on the current url
  // If that's true render null instead of the sidebar
  if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null;

  return (
    <div className="header">
      <div className="header-align">
        <Drawer />
        <div className="header-icon">
          {!user ? (
            <div>
              <IconButton
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                <Login fontSize="large" style={{ color: "#ffff90" }} />
              </IconButton>
            </div>
          ) : (
            <Dashboard />
          )}
          {/* <Link to={"/checkout"}>
            <IconButton>
              <Badge badgeContent={String(cartItems.length)} color="secondary">
                <ShoppingCart fontSize="large" style={{ color: "#ffff90" }} />
              </Badge>
            </IconButton>
          </Link> */}
          <CartDrawer />
        </div>
      </div>
    </div>
  );
}
