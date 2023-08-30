import * as React from "react";
import AddProduct from "../../pages/AddProduct";
import Login from "../../pages/Login";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function AddProductModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) {
      setUser(isUser);
    }
  }, []);
  return (
    <>
      {user ? (
        <>
          <IconButton fullWidth onClick={handleOpen} variant="outlined">
            <AddIcon fontSize="large" />
          </IconButton>
          <Modal open={open}>
            <Box sx={style}>
              <Button color="error" variant="contained" onClick={handleClose}>
                <CloseIcon />
              </Button>
              <AddProduct />
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <IconButton fullWidth onClick={handleOpen} variant="outlined">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Modal open={open}>
            <Box sx={style}>
              <Button color="error" variant="contained" onClick={handleClose}>
                <CloseIcon />
              </Button>
              <Login />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
