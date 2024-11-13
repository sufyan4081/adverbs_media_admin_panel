import React from "react";
import "./style.css";
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { purple } from "@mui/material/colors";

const ChooseMultipleVideo = ({
  label,
  name,
  formik,
  error,
  setSelectedFileName,
  selectedFile,
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
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box>
          <Button
            sx={{
              width: "100%",
              padding: "8px 0px !important",
              backgroundColor: "purple",
              "&:hover": {
                backgroundColor: "purple",
              },
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            {label}
            <input
              key={inputKey}
              type="file"
              style={{
                display: "none",
              }}
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
                  {index + 1}. {file.slice(0, 10)}
                  {", "}
                  {/* {index !== selectedFile.length - 1 ? ", " : ""} */}
                </span>
              ))}
            </Typography>
          ) : null}
        </Box>

        <Box>
          {/* Helper Text */}
          {formik.touched[name] && formik.errors[name] && (
            <FormHelperText
              style={{
                color: "red",
                margin: "2px 0 0 5px",
                fontSize: ".7rem",
              }}
            >
              {formik.errors[name]}
            </FormHelperText>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChooseMultipleVideo;
