import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import Drawer from "../Drawer";
import Dashboard from "../Dashboard";
import "./Header.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="header">
        <div className="header-align">
          <div className="header-icon">
            <span>
              <Drawer />
            </span>
            <Link to={"/"}>
              <IconButton>
                {/* <HomeIcon fontSize="large" style={{ color: "#ffff90" }} /> */}
                <span
                  style={{
                    color: "#ffff90",
                    // marginLeft: "10px",
                    fontSize: "28px",
                  }}
                >
                  <strong>BQ</strong> Store
                </span>
              </IconButton>
            </Link>
          </div>
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
            <Link to={"/cart"}>
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
