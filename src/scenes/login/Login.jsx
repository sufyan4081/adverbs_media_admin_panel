import { Alert, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginImg.jpeg";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      toast.error("Please Enter Email and Password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    dispatch(loginUser(payload)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      }
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Background image with blur */}
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)", // Apply a slight blur only to the background
          zIndex: -1, // Behind the login box
        }}
      ></Box> */}

      {/* Login Box */}
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

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <Box sx={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{ color: "#fff", fontSize: "14px" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{ color: "#fff", fontSize: "14px" }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </Box>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "bold",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loading ? "Loading..." : "SIGN IN"}
            </button>
            {error && (
              <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
                <Alert severity="error">
                  Invalid credentials. Please try again.
                </Alert>
              </Stack>
            )}
          </form>

          {/* Forgot Password Link */}
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "white",
              display: "block",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
