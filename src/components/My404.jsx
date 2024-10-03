import { Link, useNavigate, useParams } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";

const My404 = () => {
  const navigate = useNavigate();
  const { my404 } = useParams();
  return (
    <>
      <div
        className="header-image"
        style={{ marginTop: 100, paddingInline: 30 }}
      >
        <Link to={"/"}>Home</Link>
        {" / "}
        <Link>404</Link>
      </div>

      <div className="cart">
        <div className="cart-container">
          <h1>Page Not Found</h1>
          <h3>Sorry, this page or product isn&apos;t available.</h3>
          <p>
            The link you followed may be broken, or the page may have been
            removed. Go back to <Link to={"/"}>BQ Store</Link>.
          </p>
          <Material.Button
            className="checkout-btn"
            onClick={() => navigate("/")}
            variant="contained"
            startIcon={<Icon.Home />}
            color="warning"
            size="large"
          >
            Back to Home
          </Material.Button>
        </div>
      </div>
    </>
  );
};

export default My404;
