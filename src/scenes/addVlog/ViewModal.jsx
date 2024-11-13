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
      <ViewModalTitle data={data?.headerTitle} />
      <DialogContent sx={{ padding: "16px" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>logger Name:</b> {data?.headerTitle}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>date:</b> {data?.date.slice(0, 10)}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Videos: </b>
          {data?.video?.map((v, i) => (
            <div key={v._id}>
              <a
                href={`http://ec2-13-232-51-190.ap-south-1.compute.amazonaws.com:5000${v}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`Watch Video ${i + 1}`}
              </a>
            </div>
          ))}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <b>Video Link: </b>
          {data?.url === ""
            ? "No data available"
            : data?.url?.length > 0
            ? data?.url?.map((v, i) => (
                <a
                  key={i}
                  href={`http://ec2-13-232-51-190.ap-south-1.compute.amazonaws.com:5000${v}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginBottom: "5px" }} // Add style for spacing
                >
                  {`Watch Video ${i + 1}`}
                </a>
              ))
            : null}{" "}
          {/* Added a null check */}
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
