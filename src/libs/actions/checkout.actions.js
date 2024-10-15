import { initialScrollTo } from "../../constants";
import { BE_URL } from "../../constants/url";

export const checkOutTextFieldSet = (order) => {
  return [
    { value: order.name, name: "name", label: "Name" },
    {
      value: order.phoneNumber,
      name: "phoneNumber",
      label: "Phone no.",
    },
    {
      value: order.address,
      name: "address",
      label: "Address",
    },
    { value: order.email, name: "email", label: "Email" },
  ];
};

export const userDataSet = (token, order, total, cartItems) => {
  return {
    token: token,
    name: order.name,
    phoneNumber: order.phoneNumber,
    address: order.address,
    email: order.email,
    total: total,
    products: cartItems.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category,
        seller: item.seller,
        quantity: item.quantity,
      };
    }),
  };
};

export const handleClose = (event, reason, setOpen) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};

export const handleChange = (e, order, setOrder) => {
  const { value, name } = e.target;
  setOrder(() => {
    return { ...order, [name]: value };
  });
};

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
        localStorage.setItem(
          "userInput",
          JSON.stringify({ name, phoneNumber, address, email })
        );
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
