import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  TextField,
} from "@mui/material";
import React from "react";

const DeleteModal = ({
  showDeleteConfirmation,
  handleCancelDelete,
  handleConfirmDelete,
  comment,
  setComment,
  commentTrue,
  formik,
}) => {
  // Function to check if the "Yes" button should be enabled
  const isButtonEnabled = () => {
    // If comment is required and not provided, disable the button
    if (commentTrue && !comment.trim()) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {commentTrue
              ? " Why do you want to delete this data?"
              : "Are you sure you want to delete this data?"}
          </DialogContentText>
          {/* Add TextField for the comment */}
          {commentTrue && (
            <TextField
              size="small"
              autoFocus
              margin="dense"
              id="comment"
              name="comment"
              label="Comment"
              type="text"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={formik.handleBlur}
              // error={formik.touched.comment && Boolean(formik.errors.comment)}
              // helperText={formik.touched.comment ? formik.errors.comment : ""}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button
            disabled={!isButtonEnabled()}
            onClick={handleConfirmDelete}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
