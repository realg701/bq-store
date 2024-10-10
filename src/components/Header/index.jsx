import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import Drawer from "../Drawer";
import Dashboard from "../Dashboard";
import "./Header.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const withouSidebarRoutes = ["<routes>"];

export default function Header() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
  const user = JSON.parse(localStorage.getItem("user"));

  const { pathname } = useLocation();

  // Validates if the current pathname includes one the routes you want to hide the sidebar is present on the current url
  // If that's true render null instead of the sidebar

  if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null;

  return (
    <>
      <div className="header">
        <div className="header-align">
          <Drawer />
          <div className="header-icon">
            {!user ? (
              <div>
                <IconButton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LoginIcon fontSize="large" style={{ color: "#ffff90" }} />
                </IconButton>
              </div>
            ) : (
              <Dashboard />
            )}
            <Link to={"/checkout"}>
              <IconButton>
                <Badge
                  badgeContent={String(cartItems.length)}
                  color="secondary"
                >
                  <ShoppingCartIcon
                    fontSize="large"
                    style={{ color: "#ffff90" }}
                  />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
