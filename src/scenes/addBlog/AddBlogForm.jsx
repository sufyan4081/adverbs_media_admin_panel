import { useFormik } from "formik";
import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { InputForm } from "../../components/InputForm";
import FormButton from "../../components/FormButton/FormButton";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, EditBlog } from "../../api/Blog/blog_api";
import { QueryKeys } from "../../utils/QueryKey";
import ChooseMultipleImage from "../../components/ChooseFile/ChooseMultipleImage";
import { format } from "date-fns";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
  title: "",
  images: [],
  content: "",
  headerTitle: "",
  date: "",
};

const AddBlogForm = ({ formData }) => {
  const [selectedFile, setSelectedFileName] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState(null); // State to store selected image indic
  const queryClient = useQueryClient();

  console.log("selectedIndices", selectedIndices);
  // post the data
  const createPostMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.blog });
      enqueueSnackbar("Blog Added Successfully", {
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
      enqueueSnackbar("An error occurred while adding the new blog", {
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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    headerTitle: Yup.string().required("Header title is required"),
    date: Yup.string().required("Please select a date"),
    images: Yup.array()
      .of(
        Yup.mixed().test(
          "imageRequired",
          "Image is required",
          function (value) {
            // Check if an image is selected (non-null, non-undefined)
            return value !== undefined && value !== null;
          }
        )
      )
      .min(1, "At least one image is required")
      .required("Image is required"), // Add required validation to the array
  });

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values);
    try {
      if (!formData) {
        // Create FormData
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("headerTitle", values.headerTitle);
        formData.append("date", values.date);
        formData.append("imageIndex", selectedIndices);

        if (values?.images) {
          values?.images?.forEach((file) => {
            formData?.append("images", file);
          });
        }

        // Call the mutation
        await createPostMutation.mutateAsync(formData);
      } else {
        const _id = values._id.toString();
        console.log("selectedIndices", selectedIndices);
        await EditBlog(_id, values, selectedIndices); // Pass selectedIndices here
        queryClient.invalidateQueries({ queryKey: QueryKeys.blog });
        enqueueSnackbar("Blog Updated Successfully", {
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
      console.error("Error while adding the data:", error);
      enqueueSnackbar("An error occurred while adding the new blog", {
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
    validateOnMount: true,
  });

  const { errors, setValues, setFieldValue, handleSubmit, resetForm, values } =
    formik;

  const handleSubmitWithValidation = async () => {
    // Trigger form validation manually
    await formik.validateForm();
    // Set all fields as touched to show errors for all fields
    formik.setTouched({
      title: true,
      content: true,
      headerTitle: true,
      date: true,
      images: true,
    });

    if (formik.isValid) {
      handleSubmit();
    }
  };

  const handleResetWithValidation = () => {
    // Reset form and error state
    formik.resetForm({
      values: {
        title: "",
        content: "",
        headerTitle: "",
        date: "",
        images: [],
      },
    });

    setFieldValue("images", null);
    setSelectedFileName([]);

    // Ensure touched state is reset so new validations are applied
    formik.setTouched({
      title: false,
      content: false,
      headerTitle: false,
      date: false,
      images: false,
    });
  };

  //update the data
  useEffect(() => {
    if (formData) {
      console.log("formData.date:", formData?.date);
      setValues({
        _id: formData?._id || "",
        title: formData?.title || "",
        content: formData?.content || "",
        headerTitle: formData?.headerTitle || "",
        date: formData?.date
          ? format(new Date(formData.date), "yyyy-MM-dd")
          : "",
      });
      if (formData && formData?.images) {
        setSelectedFileName(formData?.images);
        setFieldValue("images", formData?.images);
      }
    }
  }, [formData, setFieldValue, setValues]);

  const handleReset = () => {
    resetForm({
      values: {
        images: [],
      },
    });
    setFieldValue("images", null);
    setSelectedFileName([]);
  };

  const type = "date";

  const flexColumn = formData ? "column" : "row";
  return (
    <Box
      sx={{
        width: {
          lg: formData ? "300px" : "700px",
          md: formData ? "280px" : "500px",
          sm: formData ? "200px" : "400px",
          xs: formData ? "200px" : "300px",
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
          {formData ? "Edit Blog" : "Add Blog"}
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
            {/* title, content */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: {
                  lg: flexColumn,
                  md: flexColumn,
                  sm: "column",
                  xs: "column",
                },
                gap: "10px",
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="title"
                placeholder="Enter Title"
              />
              <InputForm
                type="text"
                formik={formik}
                name="content"
                placeholder="Enter Description"
              />
            </Box>

            {/* header title, date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: {
                  lg: flexColumn,
                  md: flexColumn,
                  sm: "column",
                  xs: "column",
                },
                gap: "10px",
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="headerTitle"
                placeholder="Enter Blogger Name"
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

            {/* image, submit button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                width: "100%",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {selectedIndices === null && formData ? (
                <ChooseMultipleImage
                  label="Upload image"
                  name="images"
                  formik={formik}
                  error={errors.images}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                  setSelectedIndices={setSelectedIndices}
                  disabled={true}
                  formData={true}
                />
              ) : (
                <ChooseMultipleImage
                  label="Upload image"
                  name="images"
                  formik={formik}
                  error={errors.images}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                  setSelectedIndices={setSelectedIndices}
                  disabled={false}
                  formData={false}
                />
              )}

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

export default AddBlogForm;
