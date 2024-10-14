import { BE_URL } from "../../constants/url";

export const handleClose = (event, reason, setOpen) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};

export const handleChange = (e, user, setUser) => {
  const { value, name } = e.target;
  setUser(() => {
    return { ...user, [name]: value };
  });
};

export const handleSubmit = async (user, navigate, setOpen) => {
  const userData = { userName: user.userName, passWord: user.passWord };
  const response = await fetch(`${BE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/auth/dashboard");
    return;
  }
  setOpen(true);
};
