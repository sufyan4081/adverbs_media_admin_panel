import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { InputForm } from "../../components/InputForm";
import FormButton from "../../components/FormButton/FormButton";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import ChooseMultipleVideo from "../../components/ChooseFile/ChooseMultipleVideo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVlog, EditVlog } from "../../api/Vlog/vlog_api";
import { QueryKeys } from "../../utils/QueryKey";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { format } from "date-fns";

const initialValues = {
  headerTitle: "",
  date: "",
  videos: [],
  url: [],
};

const AddVlogForm = ({ formData }) => {
  const [selectedFile, setSelectedFileName] = useState("");

  const queryClient = useQueryClient();

  // post the data
  const createPostMutation = useMutation({
    mutationFn: createVlog,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.vlog });

      enqueueSnackbar("Vlog Added Successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="success">
            <CloseIcon />
          </Button>
        ),
      });
      handleReset();
    },
    onError: (error) => {
      enqueueSnackbar("An error occurred while adding the new vlog", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="success">
            <CloseIcon />
          </Button>
        ),
      });
    },
  });

  const validationSchema = Yup.object({
    headerTitle: Yup.string().required("Enter logger name"),
    date: Yup.string().required("Please select a date"),
    videos: Yup.array()
      .of(Yup.mixed())
      .test("is-mp4", "Only MP4 files are supported.", (value) => {
        // Ensure all files are MP4 format
        return value.every((file) => {
          return file && file.type === "video/mp4";
        });
      })
      .required("Please upload at least one video"),
  });
  const onSubmit = async (values) => {
    try {
      if (!formData) {
        formData = new FormData(); // Change const to formData

        formData.append("headerTitle", values.headerTitle);
        formData.append("date", values.date);

        if (values.url.length === 0) {
          formData.append("url", []);
        } else {
          formData.append("url", values.url);
        }

        if (values?.videos) {
          values.videos.forEach((file) => {
            formData.append("videos", file);
          });
        }
        await createPostMutation.mutateAsync(formData);
        handleReset();
      } else {
        const _id = values._id.toString();
        await EditVlog(_id, values);
        queryClient.invalidateQueries({ queryKey: QueryKeys.vlog });
        enqueueSnackbar("Vlog Updated Successfully", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)} color="success">
              <CloseIcon />
            </Button>
          ),
        });
      }
    } catch (error) {
      console.error("Error while adding/updating the data:", error);
      enqueueSnackbar("An error occurred while adding the new vlog", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="success">
            <CloseIcon />
          </Button>
        ),
      });
    }
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
    validateOnMount: false, // Don't validate on mount
    validateOnBlur: true, // Validate when fields are blurred
    validateOnChange: false, // Optionally, set to false to only validate on submit/blur
  });

  const {
    errors,
    setValues,
    setFieldValue,
    handleSubmit,
    resetForm,
    values,
    handleBlur,
  } = formik;

  //update the data
  useEffect(() => {
    if (formData) {
      setValues({
        _id: formData?._id || "",
        headerTitle: formData?.headerTitle || "",
        date: formData?.date
          ? format(new Date(formData.date), "yyyy-MM-dd")
          : "",
        videos: formData?.videos || [],
        url: formData?.url || [],
      });
    }
  }, [formData, setFieldValue, setValues]);

  const handleReset = () => {
    resetForm();
    setSelectedFileName("");
  };

  const addVideo = () => {
    setFieldValue("url", [...values.url, []]); // Append an empty array
  };

  // remove options button
  const removeVideo = (index) => {
    const newVideos = [...values.url];
    newVideos.splice(index, 1);
    setFieldValue("url", newVideos);
  };

  const handleChangeOptions = (e, index, field) => {
    const newVideos = [...values.url];
    // Ensure that e.target.value is a string, otherwise set it to an empty string
    const newValue = typeof e.target.value === "string" ? e.target.value : "";
    newVideos[index] = newValue;
    setFieldValue("url", newVideos);
  };

  const type = "date";

  const handleSubmitWithValidation = async () => {
    // Trigger form validation manually
    await formik.validateForm();
    // Set all fields as touched to show errors for all fields
    formik.setTouched({
      headerTitle: true,
      date: true,
      videos: true,
    });

    if (formik.isValid) {
      handleSubmit(); // Submit only if form is valid
    }
  };

  const handleResetWithValidation = () => {
    // Reset form and error state
    formik.resetForm({
      values: {
        headerTitle: "",
        date: "",
        videos: [],
        url: [],
      },
    });

    setFieldValue("videos", null);
    setSelectedFileName([]);

    // Ensure touched state is reset so new validations are applied
    formik.setTouched({
      headerTitle: false,
      date: false,
      videos: false,
      url: false,
    });
  };

  return (
    <Box
      sx={{
        width: {
          lg: formData ? "100%" : "700px",
          md: formData ? "100%" : "500px",
          sm: formData ? "100%" : "400px",
          xs: formData ? "100%" : "200px",
        },
        margin: "auto auto",
      }}
    >
      <fieldset style={{ border: "1px solid grey", width: "100%" }}>
        <legend
          style={{
            float: "none",
            width: "auto",
            margin: "0 8px 0 5px",
            padding: "0 5px 0 5px",
            fontSize: ".8rem",
          }}
        >
          {formData ? "Edit Vlog" : "Add Vlog"}
        </legend>
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {/* header title, date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                mb: 2,
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="headerTitle"
                placeholder="Enter Logger Name"
              />
              <TextField
                size="small"
                type="date"
                id="outlined-basic"
                label="Please Select Date"
                name="date"
                placeholder="Please Select Date"
                value={values?.date}
                variant="outlined"
                onChange={formik.handleChange}
                fullWidth
                onBlur={formik.handleBlur} // Ensure onBlur triggers validation
                error={Boolean(formik.touched.date && formik.errors.date)} // Show error only after interaction
                helperText={
                  formik.touched.date && formik.errors.date
                    ? formik.errors.date
                    : ""
                } // Display error message only when touched
                InputProps={
                  type === "date"
                    ? {
                        startAdornment: (
                          <InputAdornment position="start">
                            <span role="img" aria-label="calendar">
                              📅
                            </span>
                          </InputAdornment>
                        ),
                      }
                    : {}
                }
              />
            </Box>

            {/* url and videos */}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "row",
                  xs: "column",
                },
                width: "100%",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <ChooseMultipleVideo
                  label="Upload video"
                  name="videos"
                  formik={formik}
                  error={errors.videos}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                {/* Video Links */}
                {values?.url?.map((link, index) => (
                  <Box key={index}>
                    <Typography variant="h6">{`video link ${
                      index + 1
                    }`}</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <TextField
                        style={{
                          width: "200px",
                          marginBottom: "5px",
                        }}
                        id={`url[${index}]`}
                        label={`Enter video link ${index + 1}`}
                        variant="outlined"
                        name={`url[${index}]`}
                        required
                        value={link || ""}
                        onChange={(e) => handleChangeOptions(e, index, "url")}
                        onBlur={handleBlur}
                      />
                      <Box>
                        <Button
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => removeVideo(index)}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}

                {/* Add Video Link Button */}
                <Button onClick={addVideo} variant="contained" color="success">
                  Add URL
                </Button>
              </Box>
            </Box>

            {/* image, submit button */}
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                },
                width: "100%",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <FormButton
                formData={formData}
                handleCombinedClick={handleSubmitWithValidation}
                handleReset={handleResetWithValidation}
              />
            </Box>
          </Box>
        </Box>
      </fieldset>
    </Box>
  );
};

export default AddVlogForm;
