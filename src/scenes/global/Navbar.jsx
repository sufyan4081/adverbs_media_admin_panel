import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ProfileIcon from "./UserProfile/ProfileIcon";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Navbar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Check current routes and hide topBar
  const isLoginPage = location.pathname === "/";
  const forgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (forgotPage || isLoginPage) {
    return null; // Return null to hide the header
  }

  // ----------------------------------------------------------------------------------------------

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Greenfun Group
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.link}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Header - Adjusts height when the top-bar hides */}
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          backgroundColor: "lightgreen",
          width: "100%",
          transition: "top 0.8s ease-in-out, height 0.3s ease-in-out",
          zIndex: 1100,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 20px 0px 20px",
          }}
        >
          {/* Menu Icon (for mobile) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Center the logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              component={Link}
              to="/dashboard"
              variant="h4"
              sx={{ textDecoration: "none", color: "black" }}
            >
              Greenfun Group
            </Typography>
          </Box>
          {/* Navigation items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1, // Adjust gap between items if needed
            }}
          >
            {navItems?.map((item) => (
              <Button
                key={item.name}
                sx={{
                  color: "black",
                  textTransform: "none",
                  // Prevent layout shift
                  minWidth: "auto",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  fontSize: "18px",
                }}
                component={Link}
                to={item.link}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <ProfileIcon />
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;

// Updated navItems with links
export const navItems = [
  { name: "Blog", link: "/add-blog" },
  { name: "Vlog", link: "/add-vlog" },
  { name: "Certificate", link: "/add-certificate" },
];
