import { Box, Typography } from "@mui/material";
import React from "react";

const ProfileInfo = ({ colors }) => {
  return (
    <>
      <Box mb="25px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src="https://aci.campus365.io/uploads/school_content/logo/1.jpeg"
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h2"
            color="white"
            fontWeight="bold"
            sx={{ m: "10px 0 0 0" }}
          >
            ADMIN
          </Typography>
          <Typography variant="h5" color="white">
            Name
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileInfo;
