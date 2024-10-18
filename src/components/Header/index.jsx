import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Drawer from "../Drawer";
import Dashboard from "../Dashboard";
import CartDrawer from "../CartDrawer";
import "./Header.css";

const withouSidebarRoutes = ["<routes>"];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
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
          <CartDrawer />
        </div>
      </div>
    </div>
  );
}
