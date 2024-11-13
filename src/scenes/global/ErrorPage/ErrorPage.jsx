import React, { useEffect } from "react";
import { Box } from "@mui/material";

const ErrorPage = () => {
  useEffect(() => {}, []);
  return (
    <Box m="20px" sx={{ background: "red" }}>
      <p>Something went wrong 404 page not found...</p>
    </Box>
  );
};

export default ErrorPage;
