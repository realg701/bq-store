import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BE_URL } from "../../constants/url";

export default function Login() {
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
      navigate("/addproduct");
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="container">
        <div className="login-flex">
          <div className="login-container">
            <Container className="login-input-container">
              <h3>Login</h3>
              <TextField
                fullWidth
                value={userName}
                onChange={handleChange}
                name="userName"
                label="Username"
                variant="outlined"
              />
              <TextField
                fullWidth
                value={passWord}
                onChange={handleChange}
                name="passWord"
                type="password"
                label="Password"
                variant="outlined"
              />
              <Button
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                color="success"
                className="login-btn"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                fullWidth
                onClick={() => navigate("/register")}
                variant="contained"
                color="info"
                className="login-btn"
                startIcon={<PersonAddIcon />}
              >
                Register
              </Button>
              <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Login Failed!
                </Alert>
              </Snackbar>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
