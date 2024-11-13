import { useFormik } from "formik";
import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { InputForm } from "../../components/InputForm";
import ChooseFileComp from "../../components/ChooseFile/ChooseFileComp";
import FormButton from "../../components/FormButton/FormButton";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCertificate,
  EditCertificate,
} from "../../api/Certificate/certificate_api";
import { QueryKeys } from "../../utils/QueryKey";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import ChooseMultipleImage from "../../components/ChooseFile/ChooseMultipleImage";

const initialValues = {
  title: "",
  date: "",
  code: "",
  certificates: [],
};

const AddCertificateForm = ({ formData }) => {
  const [selectedFile, setSelectedFileName] = useState("");

  // // notistack
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  // post the data
  const createPostMutation = useMutation({
    mutationFn: createCertificate,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.certificate });

      enqueueSnackbar("Certificate Added Successfully", {
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
      enqueueSnackbar(" An error occurred while adding the new certificate", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} sx={{ color: "white" }}>
            <CloseIcon />
          </Button>
        ),
      });
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    date: Yup.string().required("Please select date"),
    code: Yup.string().required("Code is required"),
    certificates: Yup.mixed()
      .test("imageRequired", "Image is required", function (value) {
        if (!formData || (formData && formData.certificates !== value)) {
          // Check if a new certificates is being uploaded
          return value !== undefined && value !== null;
        }
        return true; // No new certificates is selected, so no validation error
      })
      .required("Image is required"),
  });

  const onSubmit = async (values) => {
    try {
      if (!formData) {
        // Create FormData
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("code", values.code);
        formData.append("date", values.date);

        if (values?.certificates) {
          values?.certificates?.forEach((file) => {
            formData?.append("certificates", file);
          });
        }

        // Call the mutation
        await createPostMutation.mutateAsync(formData);
      } else {
        const _id = values._id.toString();
        await EditCertificate(_id, values);
        queryClient.invalidateQueries({ queryKey: QueryKeys.certificate });
        enqueueSnackbar("Certificate Updated Successfully", {
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
      enqueueSnackbar("An error occurred while adding the new certificate", {
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

  //update the data
  useEffect(() => {
    if (formData) {
      setValues({
        _id: formData?._id || "",
        title: formData?.title || "",
        date: formData?.date
          ? format(new Date(formData.date), "yyyy-MM-dd")
          : "",
        code: formData?.code || "",
      });
      if (formData && formData?.certificates) {
        setSelectedFileName(formData?.certificates);
        setFieldValue("certificates", formData?.certificates);
      }
    }
  }, [formData, setFieldValue, setValues]);

  const handleReset = () => {
    resetForm();
    setFieldValue("certificates", null);
    setSelectedFileName("");
  };

  const type = "date";

  const flexColumn = formData ? "column" : "row";

  const handleSubmitWithValidation = async () => {
    // Trigger form validation manually
    await formik.validateForm();
    // Set all fields as touched to show errors for all fields
    formik.setTouched({
      title: true,
      code: true,
      date: true,
      certificates: true,
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
        code: "",
        date: "",
        certificates: [],
      },
    });

    setFieldValue("certificates", null);
    setSelectedFileName([]);

    // Ensure touched state is reset so new validations are applied
    formik.setTouched({
      title: false,
      code: false,
      date: false,
      certificates: false,
    });
  };

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
          {formData ? "Edit Certificate" : "Add Certificate"}
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
            {/* title, date */}
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  lg: flexColumn,
                  md: flexColumn,
                  sm: "column",
                  xs: "column",
                },
                gap: "10px",
                mb: 2,
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="title"
                placeholder="Enter Title"
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

            {/* code, certificates */}
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  lg: flexColumn,
                  md: flexColumn,
                  sm: "column",
                  xs: "column",
                },
                gap: "10px",
                mb: 2,
                width: "100%",
              }}
            >
              <InputForm
                type="text"
                formik={formik}
                name="code"
                placeholder="Enter code"
              />
              {formData ? (
                <ChooseMultipleImage
                  label="Upload certificates"
                  name="certificates"
                  formik={formik}
                  error={errors.certificates}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                  disabled={true}
                />
              ) : (
                <ChooseMultipleImage
                  label="Upload Certificates"
                  name="certificates"
                  formik={formik}
                  error={errors.certificates}
                  selectedFile={selectedFile && selectedFile}
                  setSelectedFileName={setSelectedFileName}
                />
              )}
            </Box>

            {/* submit button */}
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

export default AddCertificateForm;
