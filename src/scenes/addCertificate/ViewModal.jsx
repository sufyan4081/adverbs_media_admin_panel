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
      <ViewModalTitle data={data?.title} />
      <DialogContent sx={{ padding: "16px" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Title:</b> {data?.title}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Code:</b> {data?.code}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Date:</b> {data?.date.slice(0, 10)}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Images:</b>{" "}
          {data?.certificates.map((img, idx) => (
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
        </Typography>
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
