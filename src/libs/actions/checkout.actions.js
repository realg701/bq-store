import { initialScrollTo } from "../../constants";
import { BE_URL } from "../../constants/url";

export const handleSubmit = async (
  userData,
  setOpen,
  setLoading,
  setCartItems,
  setMessage
) => {
  const { token, name, phoneNumber, address, email, total, products } =
    userData;

  if (!name || !phoneNumber || !address || !email) {
    initialScrollTo(0);
    return setOpen(true);
  }
  setLoading(true);
  fetch(`${BE_URL}/orders/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
      total: total,
      products: products,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("CheckOut:", data);
      if (data.status === "success") {
        setCartItems([]);
        setMessage("Order Placed Successfully");
      }
      if (data.status === "empty") {
        setMessage("Your Cart Is Empty");
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false));
};
