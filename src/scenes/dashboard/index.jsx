import { Box, CircularProgress, Grid } from "@mui/material";
import StatsBox from "./StatsBox";
import Header from "../../components/Header";
import { QueryKeys } from "../../utils/QueryKey";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fetchUser } from "../../api/User/user_api";
const Dashboard = () => {
  // Get user details from Redux state
  const user = useSelector((state) => state.user.user);

  const {
    data: userLength,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryFn: fetchUser,
    queryKey: QueryKeys.user,
  });

  if (isUserLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }
  if (isUserError) {
    return <p>Error: {userError.message}</p>;
  }

  return (
    <Box data-aos="fade">
      {/* Header Components*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          width: "100%",
          padding: {
            lg: "0px 0px 0px 20px",
            md: "0px 0px 0px 20px",
            sm: "0px 20px 0px 20px",
            xs: "0px 20px 0px 20px",
          },
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Header
            title="DASHBOARD"
            // subtitle={`Welcome ${user ? user?.account?.name : "Admin"}`}
            subtitle="Welcome Admin"
          />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            flexWrap="wrap"
          >
            <StatsBox
              total={userLength ? userLength?.length : "Not Available"}
              name="Total Users"
              to="/users"
              icon={
                <AccountCircleIcon
                  style={{
                    fontSize: "45px",
                    color: "white",
                    marginBottom: "0px",
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
