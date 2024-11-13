import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box, CircularProgress, Grid } from "@mui/material";
import AddCertificateTable from "./AddCertificateTable";
import AddCertificateForm from "./AddCertificateForm";
import { useQuery } from "@tanstack/react-query";
import { fetchCertificates } from "../../api/Certificate/certificate_api";
import { QueryKeys } from "../../utils/QueryKey";

const AddCertificate = () => {
  // Use React Query to fetch certificate data
  const {
    data: certificateData,
    error: certificateError,
    isLoading: certificateIsLoading,
    isError: certificateIsError,
  } = useQuery({ queryFn: fetchCertificates, queryKey: QueryKeys.certificate });

  if (certificateIsLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }
  if (certificateIsError) {
    return <p>Error: {certificateError.message}</p>;
  }

  return (
    <>
      <BreadCrumbs pageName="Add Certificate" title="Details" />
      <Box sx={{ margin: "0px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddCertificateForm />

        {/* import both table and subject filter  */}
        <Box sx={{ marginTop: "70px" }}>
          <AddCertificateTable
            certificateData={certificateData}
            allData={certificateData?.length}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddCertificate;
