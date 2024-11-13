import { Box } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";
const StatsBox = ({ total, name, icon, to }) => {
  return (
    <Box
      sx={{
        gridColumn: {
          lg: "span 3",
          md: "span 4",
          sm: "span 6",
          xs: "span 12",
        },
      }}
      backgroundColor="rgb(45, 51, 89)"
      marginBottom="14px"
      paddingTop="-15px"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          margin="10px"
        >
          <Box
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "white",
              fontSize: "30px",
              marginBottom: "20px",
            }}
          >
            {" "}
            {total}
          </Box>
          <Box sx={{ color: "white" }}>{name}</Box>
        </Box>
        <Box sx={{ margin: "10px" }}>{icon}</Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="baseline"
        backgroundColor="grey"
        margin="0px"
      >
        <Link
          to={to}
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            fontSize: "12px",
          }}
        >
          More Info <ArrowCircleRightIcon style={{ color: "white" }} />
        </Link>
      </Box>
    </Box>
  );
};

export default StatsBox;
