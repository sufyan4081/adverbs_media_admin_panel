import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box, CircularProgress, Grid } from "@mui/material";
import AddVlogTable from "./AddVlogTable";
import AddVlogForm from "./AddVlogForm";
import { QueryKeys } from "../../utils/QueryKey";
import { useQuery } from "@tanstack/react-query";
import { fetchVlogs } from "../../api/Vlog/vlog_api";

const AddVlog = () => {
  // Use React Query to fetch subject data
  const {
    data: vlogData,
    error: vlogError,
    isLoading: vlogIsLoading,
    isError: vlogIsError,
  } = useQuery({ queryFn: fetchVlogs, queryKey: QueryKeys.vlog });

  if (vlogIsLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }
  if (vlogIsError) {
    return <p>Error: {vlogError.message}</p>;
  }

  return (
    <>
      <BreadCrumbs pageName="Add Vlog" title="Details" />
      <Box sx={{ margin: "0px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddVlogForm />

        {/* import table   */}
        <Box sx={{ marginTop: "70px" }}>
          <AddVlogTable vlogData={vlogData} allData={vlogData?.length} />
        </Box>
      </Box>
    </>
  );
};

export default AddVlog;
