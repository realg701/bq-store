import { Button, TextField } from "@mui/material";
import { handleChange } from "../../libs/actions/checkout.actions";
import { initialScrollTo } from "../../constants";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";

const CheckOutComponent = ({
  marginBottom,
  heading,
  checkOutTextField,
  order,
  setOrder,
}) => {
  return (
    <div className="cart" style={{ marginBottom: marginBottom }}>
      <div className="cart-container">
        <h1>{heading}</h1>
        {checkOutTextField &&
          checkOutTextField.map((data, index) => (
            <div className="cart-card checkout-card" key={index}>
              <TextField
                required
                value={data.value}
                onChange={(e) => handleChange(e, order, setOrder)}
                name={data.name}
                label={data.label}
                variant="filled"
                color="secondary"
              />
            </div>
          ))}
        <Button
          className="checkout-btn scroll-down"
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<KeyboardDoubleArrowDown />}
          onClick={() => initialScrollTo(window.screen.height + 600)}
        >
          Scroll Down
        </Button>
      </div>
    </div>
  );
};

export default CheckOutComponent;
