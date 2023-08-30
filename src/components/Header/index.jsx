import { useContext, useEffect, useState } from "react";
import CartContext from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Person } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";

export default function Header() {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <Link to={"/"}>
            <IconButton>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <IconButton>BQ Store</IconButton>
          </Link>
        </div>
        <div>
          {user ? (
            <Link to={"/addproduct"}>
              <IconButton>
                <AddIcon fontSize="large" />
              </IconButton>
            </Link>
          ) : (
            <Link to={"/login"}>
              <IconButton>
                <Person fontSize="large" />
              </IconButton>
            </Link>
          )}
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
