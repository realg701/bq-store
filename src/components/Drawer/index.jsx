import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./drawer.css";

export default function Drawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer-left">
        <MenuIcon
          onClick={toggleDrawer(anchor, true)}
          fontSize="large"
          color="secondary"
        />
        <Link to={"/"}>
          <IconButton color="warning">
            <img src="/svgs/logo.svg" alt="" width={32} height={32} />
            <span
              style={{
                // color: "#ffff90",
                marginLeft: "4px",
                fontSize: "28px",
              }}
            >
              <strong>BQ</strong> Store
            </span>
          </IconButton>
        </Link>
      </div>
      <List>
        {["Profile", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["History", "Trash", "Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <div className="header-icon" key={anchor}>
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            fontSize="large"
            style={{ color: "#ffff90" }}
          />
          <Link to={"/"}>
            <IconButton>
              <img src="/svgs/logo.svg" alt="" width={32} height={32} />
              <span
                style={{
                  color: "#ffff90",
                  marginLeft: "4px",
                  fontSize: "28px",
                }}
              >
                <strong>BQ</strong> Store
              </span>
            </IconButton>
          </Link>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </div>
      ))}
    </div>
  );
}
