import { DialogTitle } from "@mui/material";
import React from "react";

const ViewModalTitle = ({ data, title }) => {
  return (
    <>
      <DialogTitle
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: "blue",
          color: "#fff",
          fontSize: "18px",
        }}
      >
        {data} {title && title} Details
      </DialogTitle>
    </>
  );
};

export default ViewModalTitle;
