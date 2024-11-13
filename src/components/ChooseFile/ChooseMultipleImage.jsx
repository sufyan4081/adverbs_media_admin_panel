import React from "react";
import "./style.css";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ChooseMultipleImage = ({
  label,
  name,
  formik,
  error,
  setSelectedFileName,
  selectedFile,
  disabled,
}) => {
  const handleFileChange = (e) => {
    const selectedFiles = e.currentTarget.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles); // Convert FileList to array
      formik.setFieldValue(name, filesArray); // Set the conceptimage array in formik values
      setSelectedFileName(filesArray.map((file) => file.name)); // Update the selected file names in state
    }
  };
  // Ensure the input key changes when selectedFile changes to reset it
  const inputKey = selectedFile ? selectedFile.name : "";

  // const errorImage = selectedFile.length === 0 ? "Image is required" : null;
  //

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box>
          <Button
            sx={{ width: "100%", padding: "8px 0px !important" }}
            className="common-button"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={disabled}
          >
            {label}
            <input
              key={inputKey}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </Box>
        <Box>
          {selectedFile && selectedFile.length > 0 ? (
            <Typography style={{ margin: "5px 0" }}>
              You have selected: {selectedFile.length} file(s)
              <br />
              {selectedFile.map((file, index) => (
                <span key={index}>
                  {index + 1}. {file}
                  {", "}
                  {/* {index !== selectedFile.length - 1 ? ", " : ""} */}
                </span>
              ))}
            </Typography>
          ) : null}
        </Box>

        <Box>
          {/* Helper Text */}
          {/* {formik.touched[name] && formik.errors[name] && (
            <FormHelperText
              style={{
                color: "red",
                margin: "2px 0 0 5px",
                fontSize: ".7rem",
              }}
            >
              {formik.errors[name]}
            </FormHelperText>
          )} */}
          {/* {errorImage && (
            <FormHelperText
              style={{
                color: "red",
                margin: "2px 0 0 5px",
                fontSize: ".7rem",
              }}
            >
              {errorImage}
            </FormHelperText>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default ChooseMultipleImage;
