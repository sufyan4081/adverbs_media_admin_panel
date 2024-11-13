import React from "react";
import "./style.css";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ChooseFileComp = ({
  label,
  name,
  formik,
  error,
  setSelectedFileName,
  selectedFile,
  multiple,
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.currentTarget.files[0];
    if (selectedFile) {
      formik.setFieldValue(name, selectedFile);
      setSelectedFileName(selectedFile.name);
    }
  };

  // Ensure the input key changes when selectedFile changes to reset it
  const inputKey = selectedFile ? selectedFile.name : "";

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
          >
            {label}
            <input
              key={inputKey}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple={multiple}
            />
          </Button>
        </Box>
        <Box>
          {selectedFile && (
            <Typography style={{ margin: "5px 0" }}>
              You are selected : {selectedFile?.slice(0, 10)}
            </Typography>
          )}
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

export default ChooseFileComp;
