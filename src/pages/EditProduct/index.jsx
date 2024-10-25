import React from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icons from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { BE_URL } from "../../constants/url";
import "./editproduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("Edit Product");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSingleProduct(() => {
      return { ...singleProduct, [name]: value };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${BE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    console.log("res", response);
  };

  const handleSubmit = async () => {
    const productData = { ...singleProduct };
    setLoading(true);
    fetch(`${BE_URL}/products/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMessage("Product Edited Successfully");
        }
        if (data.status === "not-found") {
          setMessage("Product Not Found");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (!user) return navigate("/login");
    setLoading(true);
    fetch(`${BE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data.product);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div
        className="header-image"
        style={{ marginTop: 100, paddingInline: 30 }}
      >
        <Link to={"/"}>Home</Link>
        {" / "}
        <Link to={"/"}>Edit</Link>
        {" / "}
        <Link>{singleProduct.title}</Link>
      </div>
      <h1 style={{ textAlign: "center" }}>{singleProduct.title}</h1>
      <div className="container">
        <div className="add-flex">
          <div className="add-container">
            {loading ? (
              <>
                <Material.CircularProgress />
              </>
            ) : (
              <Material.Container className="input-container">
                <h1>{message}</h1>
                <Material.TextField
                  required
                  fullWidth
                  value={singleProduct.title}
                  onChange={handleChange}
                  name="title"
                  label="Title"
                  variant="outlined"
                  className="text-field"
                />
                <Material.TextField
                  required
                  fullWidth
                  value={singleProduct.category}
                  onChange={handleChange}
                  name="category"
                  label="Category"
                  variant="outlined"
                  className="text-field"
                />
                <Material.TextField
                  required
                  fullWidth
                  value={singleProduct.seller}
                  onChange={handleChange}
                  name="seller"
                  label="Seller"
                  variant="outlined"
                  className="text-field"
                />
                <img
                  src={
                    singleProduct.image
                      ? singleProduct.image
                      : "/svgs/image.svg"
                  }
                  alt=""
                  width={100}
                />
                <div className="add-flex image-input">
                  <Material.TextField
                    fullWidth
                    value={singleProduct.image}
                    onChange={handleChange}
                    name="image"
                    label="Image"
                    variant="outlined"
                    className="text-field"
                  />
                  <p>or</p>
                  <Material.Button
                    variant="contained"
                    component="label"
                    size="large"
                    startIcon={<Icons.Upload />}
                  >
                    Upload
                    <input
                      onChange={handleUpload}
                      name="image"
                      type="file"
                      hidden
                    />
                  </Material.Button>
                </div>

                <Material.TextField
                  required
                  fullWidth
                  value={singleProduct.description}
                  onChange={handleChange}
                  name="description"
                  label="Description"
                  variant="outlined"
                  className="text-field"
                  multiline
                  maxRows={4}
                />
                <Material.TextField
                  required
                  fullWidth
                  value={singleProduct.price}
                  onChange={handleChange}
                  name="price"
                  label="Price"
                  type="number"
                  variant="outlined"
                  className="text-field"
                />
                <Material.Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  color="success"
                  className="add-btn"
                  startIcon={<Icons.Add />}
                >
                  Add Product
                </Material.Button>
              </Material.Container>
            )}
          </div>
        </div>
      </div>
      <Material.Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Empty Fields!
        </Alert>
      </Material.Snackbar>
    </>
  );
}
