import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Material from "@mui/material";
import * as Icon from "@mui/icons-material";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "./drawer.css";

export default function Drawer() {
  const navigate = useNavigate();
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
    <Material.Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer-left">
        <Material.IconButton>
          <Icon.Menu
            onClick={toggleDrawer(anchor, true)}
            fontSize="large"
            color="secondary"
          />
        </Material.IconButton>
        <Link to={"/"}>
          <Material.IconButton color="warning">
            <img src="/svgs/logo.svg" alt="" width={32} height={32} />
            <span
              style={{
                marginLeft: "4px",
                fontSize: "28px",
              }}
            >
              <strong>BQ</strong> Store
            </span>
          </Material.IconButton>
        </Link>
      </div>
      <List>
        {[
          {
            title: "Home",
            link: "/",
            icon: <Icon.Home fontSize="small" />,
          },
          {
            title: "Categories",
            link: "/categories",
            icon: <Icon.Class fontSize="small" />,
          },
          {
            title: "Profile",
            link: "/dashboard",
            icon: <Icon.Person fontSize="small" />,
          },
        ].map((text, index) => (
          <Link to={text.link} key={text}>
            <Material.ListItem disablePadding>
              <Material.ListItemButton onClick={() => navigate("/")}>
                <Material.ListItemIcon>{text.icon}</Material.ListItemIcon>
                <Material.ListItemText primary={text.title} />
              </Material.ListItemButton>
            </Material.ListItem>
          </Link>
        ))}
      </List>
      <Material.Divider />
      <Material.List>
        {[
          {
            title: "About",
            link: "/about",
            icon: <Icon.Info fontSize="small" />,
          },
          {
            title: "Contact",
            link: "/contact",
            icon: <Icon.ContactMail fontSize="small" />,
          },
        ].map((text, index) => (
          <Link to={text.link} key={text}>
            <Material.ListItem key={text.title} disablePadding>
              <Material.ListItemButton>
                <Material.ListItemIcon>{text.icon}</Material.ListItemIcon>
                <Material.ListItemText primary={text.title} />
              </Material.ListItemButton>
            </Material.ListItem>
          </Link>
        ))}
      </Material.List>
    </Material.Box>
  );
  // index % 2 === 0 ? <InboxIcon /> : <MailIcon />
  return (
    <div>
      {["left"].map((anchor) => (
        <div className="header-icon" key={anchor}>
          <Material.IconButton>
            <Icon.Menu
              onClick={toggleDrawer(anchor, true)}
              fontSize="large"
              style={{ color: "#ffff90" }}
            />
          </Material.IconButton>
          <Link to={"/"}>
            <Material.IconButton>
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
            </Material.IconButton>
          </Link>
          <Material.SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </Material.SwipeableDrawer>
        </div>
      ))}
    </div>
  );
}
