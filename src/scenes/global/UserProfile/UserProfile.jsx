import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import "./single.css";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { getAdminData } from "../../../Redux/AdminSlice";
import { CustomTextField } from "../../../components/CustomTextField";
import { updateAdminProfile } from "../../../api/Auth/updateUserProfile";

const UserProfile = () => {
  // Get adminData details from Redux state
  const adminData = useSelector((state) => state.admin.admin);
  console.log("adminData", adminData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    adminId: adminData?._id || "",
    email: adminData?.email || "",
    password: adminData?.password || "",
    name: adminData?.name || "",
    role: adminData?.role || "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateAdminProfile(payload),
    onSuccess: (data, id) => {
      dispatch(getAdminData(data.data));
      console.log("updateMutation", data);
      console.log("updateMutationId", id);
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleUpdate = async (values) => {
    console.log("values", values);
    setLoading(true);
    const payload = {
      adminId: values.adminId, // Use adminId from values
      name: values.name,
      role: values.role,
      email: values.email,
      password: values.password,
    };
    await updateMutation.mutate(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdate}
    >
      {({ handleSubmit, touched, errors }) => {
        return (
          <Box m="0px 0px 0px 0px">
            <BreadCrumbs pageName="My Profile" title="Update Profile" />
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
                  Update Profile
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
                        width: "100%",
                      }}
                    >
                      <CustomTextField
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        helperText={
                          touched.name && errors.name ? errors.name : ""
                        }
                        fieldLabel={false}
                      />
                      <CustomTextField
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        helperText={
                          touched.email && errors.email ? errors.email : ""
                        }
                        fieldLabel={false}
                      />
                    </Box>

                    {/* password, phone_number */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
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
                      <CustomTextField
                        label="Role"
                        name="role"
                        placeholder="Enter Role"
                        helperText={
                          touched.role && errors.role ? errors.role : ""
                        }
                        fieldLabel={false}
                      />
                    </Box>

                    {/* submit button */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "200px",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "rgb(45, 51, 89)",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          "&:hover": {
                            backgroundColor: "rgb(45, 51, 89)",
                          },
                          textTransform: "capitalize",
                        }}
                        disabled={loading}
                        onClick={handleSubmit}
                      >
                        {loading ? "Loading..." : "Save"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </fieldset>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};

export default UserProfile;
