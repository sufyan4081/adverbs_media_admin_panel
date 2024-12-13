import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ViewModalTitle from "../../components/ViewModalTitle";

const ViewModal = ({ open, onClose, data }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" data-aos="fade">
      <ViewModalTitle data={data?.name} />
      <DialogContent sx={{ padding: "16px" }}>
        <Typography variant="body1">
          <b>User Detail:</b>
        </Typography>
        <Typography variant="body1">
          <b>Full Name:</b> {data?.name}
        </Typography>

        <Typography variant="body1">
          <b>Mobile Number:</b> {data?.mobileNumber}
        </Typography>

        <Typography variant="body1">
          <b>Email:</b> {data?.email}
        </Typography>

        <Typography variant="body1">
          <b>Password:</b> {data?.password}
        </Typography>

        {/* company details part */}
        <Typography padding="10px 0px 0px 0px" variant="body1">
          <b>Company Details:</b>
        </Typography>
        <Typography variant="body1">
          <b>Company Name:</b> {data?.companyDetails.companyName}
        </Typography>
        <Typography variant="body1">
          <b>Country:</b> {data?.companyDetails.country}
        </Typography>
        <Typography variant="body1">
          <b>State:</b> {data?.companyDetails.state}
        </Typography>
        <Typography variant="body1">
          <b>City:</b> {data?.companyDetails.city}
        </Typography>
        <Typography variant="body1">
          <b>Pin Code:</b> {data?.companyDetails.pinCode}
        </Typography>

        {/* <Typography variant="body1" >
          <b>images:</b>{" "}
          {data?.images.map((img, idx) => (
            <img
              key={idx} // Add a unique key for each image
              src={`http://ec2-13-232-51-190.ap-south-1.compute.amazonaws.com:5000${img}`}
              alt={`image-${idx}`}
              style={{
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
            />
          ))}
        </Typography> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
