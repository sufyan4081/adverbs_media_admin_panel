import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AppButton = () => {
  return (
    <>
      <Box>
        <Link to="https://play.google.com/store" target="_self">
          <img
            src="https://aci.campus365.io/backend/images/app__android@2x.png"
            alt=""
            style={{ width: "140px", marginRight: "5px" }}
          />
        </Link>
        <Link to="https://www.apple.com/app-store/" target="_self">
          <img
            src="https://aci.campus365.io/backend/images/app__ios@2x.png"
            alt=""
            style={{ width: "140px" }}
          />
        </Link>
      </Box>
    </>
  );
};

export default AppButton;
