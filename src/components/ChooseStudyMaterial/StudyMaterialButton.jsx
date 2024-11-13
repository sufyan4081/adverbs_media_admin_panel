import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StudyMaterialButton = ({
  label,
  name,
  formik,
  error,
  setSelectedFileName,
  selectedFile,
  index,
}) => {
  const handleFileChange = (e) => {
    const newSelectedFile = e.currentTarget.files[0];

    if (newSelectedFile) {
      // File Size Validation
      const maxSizeInBytes = 16 * 1024 * 1024; // 16 MB
      if (newSelectedFile.size > maxSizeInBytes) {
        formik.setFieldError(
          `study_material[${index}]`,
          "File size must be less than 16 MB"
        );
        return; // Exit the function if validation fails
      }

      // File Type Validation
      const allowedDocumentTypes = ["application/pdf", "application/msword"];

      let isValidFileType = false;

      if (allowedDocumentTypes.includes(newSelectedFile.type)) {
        // Document file
        isValidFileType = true;
      }

      if (!isValidFileType) {
        formik.setFieldError(
          `study_material[${index}]`,
          "Only supported file types are allowed"
        );
        return; // Exit the function if validation fails
      }

      // Set formik field values if validation passes
      formik.setFieldValue(`study_material[${index}]`, newSelectedFile);
      setSelectedFileName(index, newSelectedFile.name);
      formik.setFieldError(`study_material[${index}]`, "");
    }
  };

  return (
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
            type="file"
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      {/* Conditionally render file information */}
      {selectedFile &&
        !Array.isArray(selectedFile) &&
        selectedFile.length > 0 && (
          <Typography style={{ margin: "5px 0" }}>
            You have Selected file: {selectedFile?.slice(0, 10)}
          </Typography>
        )}
      {/* Display error for study_material */}
      {formik.touched[`study_material[${index}]`] &&
        formik.errors[`study_material[${index}]`] && (
          <Typography
            style={{ color: "red", margin: "2px 0 0 5px", fontSize: ".7rem" }}
          >
            {formik.errors[`study_material[${index}]`]}
          </Typography>
        )}
    </Box>
  );
};

export default StudyMaterialButton;
