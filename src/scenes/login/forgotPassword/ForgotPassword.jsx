import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { InputForm } from "../../../components/InputForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import FormButton from "../../../components/FormButton/FormButton";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { supabase } from "../../../client";

const ForgotPassword = () => {
  const theme = useTheme();
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

  const [isResetRequested, setIsResetRequested] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await supabase.auth.api.resetPasswordForEmail(values.email);

        setIsResetRequested(true);
      } catch (error) {
        console.error(error.message || "An error occurred");
        enqueueSnackbar("An error occurred while sending the reset email", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)} sx={{ color: "white" }}>
              >
              <CloseIcon />
            </Button>
          ),
        });
      }
    },
  });

  const onAuthStateChange = (event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      // Handle password recovery here
      // For example, prompt the user to set a new password
      const newPassword = prompt("Enter your new password:");
      try {
        supabase.auth.api.updateUser({ password: newPassword });

        alert("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password:", error.message);
        alert("Error updating password:", error.message);
      }
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(onAuthStateChange);

    // No need to remove the listener in this version of Supabase

    // Cleanup the event listener on component unmount
    return () => {
      // You can add any additional cleanup code here if needed
    };
  }, []);

  const handleReset = () => {
    formik.resetForm();
    setIsResetRequested(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Upper half with background color */}
      <Box sx={{ flex: 1, backgroundColor: "rgb(45, 51, 89)" }} />

      {/* Lower half with white background */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Centered form */}
        <Box
          sx={{
            height: "400px",
            width: "350px",
            border: "1px solid black",
            borderRadius: "5px",
            marginTop: "-200px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockPersonIcon
            sx={{
              width: 100,
              height: 100,
              color: "blue",
              margin: "20px 0px 20px 0px",
            }}
          />
          <h5>Forgot Password</h5>
          {!isResetRequested ? (
            <>
              <Box sx={{ width: "300px" }}>
                <p style={{ textAlign: "center" }}>
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
              </Box>
              <Box sx={{ margin: "20px 0 20px 0", width: "300px" }}>
                <InputForm
                  type="email"
                  formik={formik}
                  color={iconColor}
                  name="email"
                  placeholder="Enter Email"
                />
              </Box>
              <Button
                sx={{ height: "35px", width: "150px", marginBottom: "20px" }}
                className="common-button"
                variant="contained"
                onClick={formik.handleSubmit}
                size="small"
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                Password reset email sent successfully! Please check your email
                for further instructions.
              </p>
              <Button
                sx={{ height: "35px", width: "150px", marginBottom: "20px" }}
                className="common-button"
                variant="contained"
                onClick={handleReset}
                size="small"
              >
                Go Back
              </Button>
            </>
          )}
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ArrowBackIosNewIcon fontSize="20px" />
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
