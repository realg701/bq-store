import { useState, useEffect, forwardRef } from "react";
import { useNavigate, useParams } from "react-router";
import "./editproduct.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditProduct() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const fetchSingleProduct = async () => {
    setLoading(true);
    const response = await fetch(
      `https://fancy-trousers-ox.cyclic.app/products/${id}`
    );
    const data = await response.json();
    setSingleProduct(data.product);
    setLoading(false);
  };

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
    const response = await fetch(
      "https://fancy-trousers-ox.cyclic.app/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("res", response);
  };

  const handleSubmit = async () => {
    const productData = { ...singleProduct };
    const response = await fetch(
      `https://fancy-trousers-ox.cyclic.app/products/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );
    console.log("Response", response);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <>
      <div className="container">
        <div className="add-flex">
          <div className="add-container">
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <Container className="input-container">
                <h3>Edit Product</h3>
                <TextField
                  required
                  fullWidth
                  value={singleProduct.title}
                  onChange={handleChange}
                  name="title"
                  label="Title"
                  variant="outlined"
                  className="text-field"
                />
                <TextField
                  required
                  fullWidth
                  value={singleProduct.category}
                  onChange={handleChange}
                  name="category"
                  label="Category"
                  variant="outlined"
                  className="text-field"
                />
                <TextField
                  required
                  fullWidth
                  value={singleProduct.seller}
                  onChange={handleChange}
                  name="seller"
                  label="Seller"
                  variant="outlined"
                  className="text-field"
                />

                <div className="add-flex image-input">
                  <TextField
                    fullWidth
                    value={singleProduct.image}
                    onChange={handleChange}
                    name="image"
                    label="Image"
                    variant="outlined"
                    className="text-field"
                  />
                  <p>or</p>
                  <Button
                    variant="contained"
                    component="label"
                    size="large"
                    startIcon={<UploadIcon />}
                  >
                    Upload
                    <input
                      onChange={handleUpload}
                      name="image"
                      type="file"
                      hidden
                    />
                  </Button>
                </div>

                <TextField
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
                <TextField
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
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  color="success"
                  className="add-btn"
                  startIcon={<AddIcon />}
                >
                  Add Product
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Empty Fieled!
                  </Alert>
                </Snackbar>
              </Container>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
