import { Box, CircularProgress, Grid } from "@mui/material";
import StatsBox from "./StatsBox";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Header from "../../components/Header";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchBlogs } from "../../api/Blog/blog_api";
import { useQuery } from "@tanstack/react-query";
import { fetchVlogs } from "../../api/Vlog/vlog_api";
import { useSelector } from "react-redux";
import { fetchCertificates } from "../../api/Certificate/certificate_api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Dashboard = () => {
  // Get user details from Redux state
  const user = useSelector((state) => state.user.user);

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
              total="2"
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
