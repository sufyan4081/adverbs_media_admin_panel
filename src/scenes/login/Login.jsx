import { Alert, Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { LoginAuth } from "../../api/Auth/Login";
import { QueryKeys } from "../../utils/QueryKey";
import ErrorToast from "../../components/toast/ErrorToast";
import { Formik } from "formik";
import { CustomTextField } from "../../components/CustomTextField";
import { getAdminData } from "../../Redux/AdminSlice.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: (payload) => LoginAuth(payload),
    onSuccess: (data) => {
      dispatch(getAdminData(data));
      setLoading(false);
      if (data) {
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleLogin = (values) => {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    loginMutation.mutate(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched, values, setFieldValue, handleSubmit }) => {
        return (
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 350,
                padding: "20px",
                // backgroundColor: "rgba(0, 0, 0, 0.6)", // Transparent dark color for the box
                backgroundColor: "#0D304F", // Transparent dark color for the box
                borderRadius: "8px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth
                color: "#fff", // White text inside the box
                backdropFilter: "blur(5px)", // Adds soft blur inside the box for a smooth effect
              }}
            >
              <p
                className="divider-text"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                SIGN IN
              </p>
              <CustomTextField
                label="Email"
                name="email"
                placeholder="Enter Email"
                helperText={touched.email && errors.email ? errors.email : ""}
                fieldLabel={false}
                isDarkMode={true}
              />
              <CustomTextField
                label="Password"
                name="password"
                placeholder="Enter Password"
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                fieldLabel={false}
                isDarkMode={true}
              />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "SIGN IN"}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Login;
