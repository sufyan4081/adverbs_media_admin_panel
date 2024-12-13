import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchUser } from "../../api/User/user_api";
import UserTable from "./UserTable";

const User = () => {
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({ queryFn: fetchUser, queryKey: QueryKeys.user });

  console.log("userData", userData);

  if (userIsLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }
  if (userIsError) {
    return <p>Error: {userError.message}</p>;
  }

  return (
    <>
      <BreadCrumbs pageName="User" title="Details" />
      <Box sx={{ margin: "0px 20px 0px 20px" }} data-aos="zoom-in">
        <Box sx={{ marginTop: "70px" }}>
          <UserTable userData={userData} />
        </Box>
      </Box>
    </>
  );
};

export default User;
