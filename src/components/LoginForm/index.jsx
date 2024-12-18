import { Box, Button, Divider, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import google from "../../assets/images/SignUp-img/google.png";
import instagram from "../../assets/images/SignUp-img/instagram.png";
import facebook from "../../assets/images/SignUp-img/facebook.png";
import { CustomTextField } from "../CustomTextField";
import { Slide, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModal } from "../../Redux/modalSlice";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../../api/Auth/Login";
import { setUserDetails } from "../../Redux/userDetailsSlice";

const LoginForm = ({ open, handleClose }) => {
  const [otpEnable, setOtpEnable] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // State for OTP digits
  const [timer, setTimer] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    mobileNumber: "",
    otp: ["", "", "", "", "", ""],
    otpFlag: false,
  };

  const validationSchema = yup.object({
    otpFlag: yup.boolean(),
    email: yup
      .string()
      .nullable()
      .when("otpFlag", {
        is: true,
        then: (schema) => schema.required("Email is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    password: yup
      .string()
      .nullable()
      .when("otpFlag", {
        is: true,
        then: (schema) => schema.required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  // Function to handle OTP input changes
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Automatically focus the next input if a digit is entered
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const sendOtpMutation = useMutation({
    mutationFn: (payload) => {
      console.log("Simulating OTP send:", payload);
      // Simulate a successful response
      return Promise.resolve({ status: 200 });
    },
    onSuccess: (data) => {
      console.log("data", data);
      setOtpEnable(true);
      setTimer(30);
      toast.success("OTP sent successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      setOtpValues(["", "", "", "", "", ""]);
    },
    onError: (data) => {
      setOtpValues(["", "", "", "", "", ""]);
      console.error("Error sending OTP (simulated).");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (payload) => {
      console.log("Simulating OTP Verified:", payload);
      // Simulate a successful response
      return Promise.resolve({ status: 200 });
    },
    onSuccess: (data, id) => {
      console.log(data, id);
      setOtpEnable(false);
      setOtpValues(["", "", "", "", "", ""]);
      dispatch(setModal("company-details"));
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    },
    onError: (data) => {
      setOtpValues(["", "", "", "", "", ""]);
      console.error("Error sending OTP (simulated).");
    },
  });

  const EmailPasswordMutation = useMutation({
    mutationFn: (payload) => Login(payload), // Ensure Login function is correctly imported
    onSuccess: (data) => {
      console.log("data", data);
      setLoading(false);
      if (!data?.companyDetails) {
        dispatch(setModal("company-details"));
        console.log(
          "Company details not found, redirecting to company details page."
        );
      } else {
        dispatch(setModal("login-success"));
        console.log("Company exists:", data?.companyDetails);
      }

      // Dispatch user details if login is successful
      if (data) {
        dispatch(setUserDetails(data));
        console.log("data.data", data);
      }
    },
    onError: (error) => {
      setLoading(false);
      // Log the actual error to help with debugging
      console.error("Error logging in:", error);
    },
  });

  const handleOnSubmit = (values) => {
    const otp = otpValues.join("");
    const payload = {
      mobileNumber: values.mobileNumber,
      enteredOTP: otp,
    };
    const payloadEmailPassword = {
      email: values.email,
      password: values.password,
    };
    console.log(payloadEmailPassword, "payloadEmailPassword");

    if (payload.mobileNumber && payload.enteredOTP) {
      verifyOtpMutation.mutate(payload);
      setLoading(true);
      console.log("payload for OTP verification:", payload);
    } else {
      setLoading(true);
      EmailPasswordMutation.mutate(payloadEmailPassword);
    }
  };

  // useFormik hook to manage form state
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [timer]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ errors, touched, values, setFieldValue, handleSubmit }) => {
        return (
          <Form>
            <Box
              sx={{
                padding: "0px 20px",
                height: "416px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                {values?.otpFlag ? (
                  <>
                    {" "}
                    <CustomTextField
                      label="Email"
                      name="email"
                      placeholder="Enter Email"
                      helperText={
                        touched.email && errors.email ? errors.email : ""
                      }
                      fieldLabel={false}
                    />
                    <CustomTextField
                      label="Password"
                      name="password"
                      placeholder="Enter Password"
                      helperText={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      fieldLabel={false}
                    />
                  </>
                ) : (
                  <>
                    <CustomTextField
                      label="Mobile Number"
                      name="mobileNumber"
                      placeholder="Enter Mobile Number"
                      helperText={
                        touched.mobileNumber && errors.mobileNumber
                          ? errors.mobileNumber
                          : ""
                      }
                      fieldLabel={false}
                    />
                    {otpEnable && (
                      <Box display="flex" gap={1} justifyContent="center">
                        {otpValues.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            style={{
                              width: "2rem",
                              height: "2rem",
                              textAlign: "center",
                              fontSize: "1.2rem",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </>
                )}

                <Box>
                  <Field
                    type="checkbox"
                    id="otpFlag"
                    name="otpFlag"
                    placeholder="Enter OTP"
                    onChange={(e) => setFieldValue("otpFlag", e.target.checked)}
                    style={{ margin: "0px 5px 0px 0px" }}
                    helperText={
                      touched.otpFlag && errors.otpFlag ? errors.otpFlag : ""
                    }
                  />
                  <label htmlFor="otpFlag">Login with Password</label>
                </Box>

                <Box item xs={12} mt={1.5} mb={1.5}>
                  {values.otpFlag ? (
                    <Button
                      variant="contained"
                      disabled={loading}
                      sx={{
                        width: "100%",
                        backgroundColor: "#DBDBDB",
                        color: "#898989",
                        textTransform: "none",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#DBDBDB",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      {loading ? "Loading..." : "Login"}
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        otpEnable
                          ? otpValues.some((value) => value === "")
                          : values.mobileNumber.length !== 10
                      }
                      variant="contained"
                      sx={{
                        width: "100%",
                        backgroundColor: "#DBDBDB",
                        color: "#898989",
                        textTransform: "none",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#DBDBDB",
                        },
                      }}
                      onClick={() => {
                        otpEnable
                          ? handleSubmit()
                          : sendOtpMutation.mutate({
                              mobileNumber: values.mobileNumber,
                            });
                      }}
                    >
                      {otpEnable ? "Login" : "Verify Mobile Number"}
                    </Button>
                  )}
                  {otpEnable && !values.otpFlag && (
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        sendOtpMutation.mutate({
                          mobileNumber: values.mobileNumber,
                        })
                      }
                      disabled={timer > 0}
                      sx={{ mt: 1, textTransform: "none" }}
                    >
                      {timer > 0
                        ? `Resend OTP in ${timer} seconds`
                        : "Resend OTP"}
                    </Button>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  {/* Divider with text */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    my={2}
                  >
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{ mx: 2, color: "#898989" }}
                    >
                      Or Login & Sign Up With
                    </Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                  </Box>

                  {/* Social media icons */}
                  <Box display="flex" justifyContent="center" gap={3} mb={1}>
                    <Link
                      href="https://www.google.com" // External URL
                      target="_blank"
                      rel="noopener noreferrer" // For security
                      sx={{
                        padding: "5px 5px 0px 5px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    >
                      <img src={google} alt="google" />
                    </Link>
                    <Link
                      href="https://www.instagram.com" // External URL
                      target="_blank"
                      rel="noopener noreferrer" // For security
                      sx={{
                        padding: "5px 5px 0px 5px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    >
                      <img src={instagram} alt="instagram" />
                    </Link>
                    <Link
                      href="https://www.facebook.com" // External URL
                      target="_blank"
                      rel="noopener noreferrer" // For security
                      sx={{
                        padding: "5px 5px 0px 5px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    >
                      <img src={facebook} alt="facebook" />
                    </Link>
                  </Box>
                </Box>
                {/* Disclaimer text */}
                <Box
                  sx={{
                    width: "100%",
                    // mt: 10,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "grey", textAlign: "center" }}
                  >
                    By proceeding, you agree to Adverbs Media{" "}
                    <Link href="#" underline="hover" sx={{ color: "#6173FD" }}>
                      Privacy
                    </Link>
                    ,{" "}
                    <Link href="#" underline="hover" sx={{ color: "#6173FD" }}>
                      User Agreement
                    </Link>{" "}
                    and{" "}
                    <Link href="#" underline="hover" sx={{ color: "#6173FD" }}>
                      T&Cs
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
