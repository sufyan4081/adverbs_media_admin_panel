import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import logo from "../../../assets/logo.png";

const SideBarBox = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";
  const isForgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (isLoginPage || isForgotPage) {
    return null; // Return null to hide the header
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `rgb(45, 51, 89)`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "0px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        backgroundColor: "rgb(45, 51, 89) !important",
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          width: isCollapsed ? "44px" : "100%",
          height: "100vh",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: "white",
              width: isCollapsed ? "42px" : "190px",
              transition: "width 0.2s",
              padding: isCollapsed ? "15px 0px 0px 15px" : "0px 20px 0px 0px",
              backgroundColor: "rgb(45, 51, 89)", // Dark green for the menu item
              listStyleType: "none",
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  pt: 1,
                  display: "flex",
                  justifyContent: isCollapsed ? "center" : "space-between",
                  alignItems: "center",
                }}
              >
                {!isCollapsed &&
                  // <img
                  //   src={logo}
                  //   alt="green fun logo"
                  //   style={{
                  //     width: "100px",
                  //     height: "70px",
                  //     objectFit: "contain",
                  //   }}
                  // />
                  "Adverbs Media"}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{ color: "white", padding: "0px" }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box
            paddingLeft={isCollapsed ? undefined : "0%"}
            style={{ paddingTop: "20px", margin: "0px" }}
          >
            <SidebarItem isCollapsed={isCollapsed} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBarBox;
