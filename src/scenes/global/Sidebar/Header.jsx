import React from "react";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = ({ isCollapsed, setIsCollapsed, colors }) => {
  return (
    <>
      <MenuItem
        onClick={() => setIsCollapsed(!isCollapsed)}
        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
        style={{
          margin: "10px 0 20px 0",
          color: "white",
        }}
      >
        {!isCollapsed && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px"
          >
            <Typography variant="h3" sx={{ color: "white" }}>
              Greenfun
            </Typography>
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </MenuItem>
    </>
  );
};

export default Header;
