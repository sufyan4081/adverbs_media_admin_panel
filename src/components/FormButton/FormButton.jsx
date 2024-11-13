import { Box, Button } from "@mui/material";
import React from "react";

const FormButton = ({ formData, handleCombinedClick, handleReset }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: {
            lg: "flex-end",
            md: "flex-end",
            sm: "flex-end",
            xs: "flex-start",
          },
          width: { lg: "100%", md: "100%", sm: "100%", xs: "50px" },
        }}
      >
        <Button
          // sx={{ height: "35px" }}
          className="submit-button"
          variant="contained"
          onClick={handleCombinedClick}
          size="small"
        >
          {formData ? "Save" : "Add"}
          {/* PayNow */}
        </Button>
        {formData ? null : (
          <Button
            // sx={{ height: "35px" }}
            className="reset-button"
            variant="contained"
            onClick={handleReset}
            size="small"
          >
            Reset
          </Button>
        )}
      </Box>
    </>
  );
};

export default FormButton;
