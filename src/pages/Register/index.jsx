import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router";
import "./addproduct.css";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

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
    if (name === "userName") {
      setUserName(value);
    }
    if (name === "passWord") {
      setPassWord(value);
    }
  };

  const handleSubmit = async () => {
    const userData = { userName, passWord };
    if (userData.userName === "") {
      setOpen(true);
      return;
    }
    if (userData.passWord === "") {
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
        body: JSON.stringify(userData),
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
              value={userName}
              onChange={handleChange}
              name="userName"
              label="Username"
              variant="outlined"
              className="text-field"
            />
            <TextField
              required
              fullWidth
              value={passWord}
              onChange={handleChange}
              name="passWord"
              label="Password"
              variant="outlined"
              className="text-field"
            />
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              color="success"
              className="add-btn"
              startIcon={<PersonAddIcon />}
            >
              Register User
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
