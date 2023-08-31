import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router";
import "./addproduct.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "category") {
      setCategory(value);
    }
    if (name === "seller") {
      setSeller(value);
    }
    if (name === "image") {
      setImage(value);
    }
    if (name === "description") {
      setDescription(value);
    }
    if (name === "price") {
      setPrice(value);
    }
  };

  const handleSubmit = async () => {
    const productData = {
      title,
      category,
      seller,
      image,
      description,
      price,
    };

    if (productData.title === "") {
      setOpen(true);
      return;
    }
    if (productData.category === "") {
      setOpen(true);
      return;
    }
    if (productData.seller === "") {
      setOpen(true);
      return;
    }
    if (productData.image === "") {
      setOpen(true);
      return;
    }
    if (productData.description === "") {
      setOpen(true);
      return;
    }
    if (productData.price === "") {
      setOpen(true);
      return;
    }

    const response = await fetch(
      "https://fancy-trousers-ox.cyclic.app/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    console.log("Response", response);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="add-flex">
        <div className="add-container">
          <Container className="input-container">
            <h3>Register User</h3>
            <TextField
              required
              fullWidth
              value={title}
              onChange={handleChange}
              name="title"
              label="Title"
              variant="outlined"
              className="text-field"
            />
            <TextField
              required
              fullWidth
              value={category}
              onChange={handleChange}
              name="category"
              label="Category"
              variant="outlined"
              className="text-field"
            />
            <TextField
              required
              fullWidth
              value={seller}
              onChange={handleChange}
              name="seller"
              label="Seller"
              variant="outlined"
              className="text-field"
            />

            <div className="add-flex image-input">
              <TextField
                fullWidth
                value={image}
                onChange={handleChange}
                name="image"
                label="Image"
                variant="outlined"
                className="text-field"
              />
            </div>

            <TextField
              required
              fullWidth
              value={description}
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
              value={price}
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
        </div>
      </div>
    </>
  );
}
