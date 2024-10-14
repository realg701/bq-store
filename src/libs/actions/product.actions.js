import { BE_URL } from "../../constants/url";

export const handleDelete = async (id, token, navigate) => {
  const response = await fetch(`${BE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log("data", data);
  navigate("/");
};
