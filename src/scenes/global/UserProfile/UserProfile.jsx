import React, { useContext, useEffect } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import "./single.css";
import Header from "../../../components/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { QueryKeys } from "../../../utils/QueryKey";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useFormik } from "formik";
import { InputForm } from "../../../components/InputForm";
import { useSelector } from "react-redux";
import BreadCrumbs from "../../../components/BreadCrumbs";

const initialValues = {
  email: "",
  password: "",
  name: "",
  phone_number: "",
  age: "",
  gender: "",
  city: "",
  role: "",
};

const UserProfile = () => {
  // Get user details from Redux state
  const user = useSelector((state) => state.user.user);

  const queryClient = useQueryClient();

  // post the data
  const createPostMutation = useMutation({
    // mutationFn: createVlog,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.profileUpdate });

      enqueueSnackbar("Profile Updated Successfully", {
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
      enqueueSnackbar("An error occurred while updating the profile", {
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
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    city: Yup.string().required("City is required"),
    role: Yup.string().required("Role is required"),
  });

  const onSubmit = async (values) => {
    try {
      if (user) {
        await createPostMutation.mutateAsync(values);
        handleReset();
      } else {
        enqueueSnackbar("Profile Can't Update", {
          variant: "error",
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
      enqueueSnackbar("An error occurred while adding the new data", {
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

  const { setValues, resetForm, handleSubmit } = formik;

  // Effect to update form values when the user is available
  useEffect(() => {
    if (user) {
      // Make a shallow copy of user object to avoid mutating
      const updatedUser = { ...user.account }; // Ensures immutability
      // Update formik values when the user object is loaded
      setValues({
        name: updatedUser?.name || "",
        email: updatedUser?.email || "",
        password: updatedUser?.password || "",
        phone_number: updatedUser?.phone_number || "",
        city: updatedUser?.city || "",
        age: updatedUser?.age || "",
        gender: updatedUser?.gender || "",
        role: updatedUser?.role || "",
      });
    }
  }, [user, setValues]); // Runs when user or setValues changes

  const handleReset = () => {
    resetForm();
  };

  return (
    <>
      <Box m="0px 0px 0px 0px">
        <BreadCrumbs pageName="My Profile" title="Edit Profile" />
        <Box
          sx={{
            width: {
              lg: "700px",
              md: "500px",
              sm: "400px",
              xs: "300px",
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
              Edit Profile
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
                {/* name, email */}
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
                    name="name"
                    placeholder="Edit Name"
                  />
                  <InputForm
                    type="text"
                    formik={formik}
                    name="email"
                    placeholder="Edit Email"
                  />
                </Box>

                {/* password, phone_number */}
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
                    name="password"
                    placeholder="Edit Password"
                  />
                  <InputForm
                    type="text"
                    formik={formik}
                    name="phone_number"
                    placeholder="Edit Phone Number"
                  />
                </Box>

                {/* city, age */}
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
                    name="city"
                    placeholder="Edit City"
                  />
                  <InputForm
                    type="text"
                    formik={formik}
                    name="age"
                    placeholder="Edit Age"
                  />
                </Box>

                {/* submit button */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <InputForm
                    type="text"
                    formik={formik}
                    name="role"
                    placeholder="Edit Role"
                  />
                  <Box width="100%" textAlign="right">
                    <Button
                      className="submit-button"
                      variant="contained"
                      onClick={handleSubmit}
                      size="small"
                      sx={{ textAlign: "right", width: "100px" }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </fieldset>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
