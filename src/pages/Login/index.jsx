import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Login, PersonAdd } from "@mui/icons-material";
import { Container, Button, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  handleChange,
  handleClose,
  handleSubmit,
} from "../../libs/actions/user.actions";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ userName: "", passWord: "" });

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return navigate("/");
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
                value={user?.userName}
                onChange={(e) => handleChange(e, user, setUser)}
                name="userName"
                label="Username"
                variant="outlined"
              />
              <TextField
                fullWidth
                value={user?.passWord}
                onChange={(e) => handleChange(e, user, setUser)}
                name="passWord"
                type="password"
                label="Password"
                variant="outlined"
              />
              <Button
                fullWidth
                onClick={() => handleSubmit(user, navigate, setOpen)}
                variant="contained"
                color="success"
                className="login-btn"
                startIcon={<Login />}
              >
                Login
              </Button>
              <Button
                fullWidth
                onClick={() => navigate("/register")}
                variant="contained"
                color="info"
                className="login-btn"
                startIcon={<PersonAdd />}
              >
                Register
              </Button>
            </Container>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        onClose={(event, reason) => handleClose(event, reason, setOpen)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={(event, reason) => handleClose(event, reason, setOpen)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Login Failed!
        </Alert>
      </Snackbar>
    </>
  );
}
