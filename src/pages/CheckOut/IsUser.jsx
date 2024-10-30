import { Button } from "@mui/material";
import { handleSubmit } from "../../libs/actions/checkout.actions";
import { Login, ShoppingCartCheckout } from "@mui/icons-material";
import { useNavigate } from "react-router";

const IsUser = ({ isUserProps }) => {
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    userData,
    setOpen,
    setIsLoading,
    setCartItems,
    setMessage,
  } = isUserProps;

  return (
    <>
      {user ? (
        <Button
          disabled={isLoading}
          className="checkout-btn"
          onClick={() =>
            handleSubmit(
              userData,
              setOpen,
              setIsLoading,
              setCartItems,
              setMessage
            )
          }
          variant="contained"
          color="success"
          startIcon={<ShoppingCartCheckout />}
          size="large"
        >
          Place Order
        </Button>
      ) : (
        <Button
          className="checkout-btn"
          onClick={() => navigate("/login")}
          variant="contained"
          startIcon={<Login />}
          color="warning"
          size="large"
        >
          Please Login
        </Button>
      )}
    </>
  );
};

export default IsUser;
