import { Box, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "../theme";

const BreadCrumbs = ({ pageName, subPageName, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ m: "1px 0 0 22px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link underline="hover" color="inherit" component={RouterLink}></Link> */}
        <Typography aria-current="page">{pageName}</Typography>
        {subPageName && (
          <Typography aria-current="page">{subPageName}</Typography>
        )}
        <Typography
          style={{ color: "#20209f", fontWeight: 600 }}
          aria-current="page"
        >
          {title}
        </Typography>
      </Breadcrumbs>

      {/* <Typography
    variant="h3"
    color={colors.grey[100]}
    fontWeight="600"
    sx={{ mt:1 }}
  >
    {title}
  </Typography> */}
    </Box>
  );
};

export default BreadCrumbs;
