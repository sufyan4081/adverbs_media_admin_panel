import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box, CircularProgress, Grid } from "@mui/material";
import AddBlogTable from "./AddBlogTable";
import AddBlogForm from "./AddBlogForm";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchBlogs } from "../../api/Blog/blog_api";

const AddBlog = () => {
  // Use React Query to fetch subject data
  const {
    data: blogData,
    error: blogError,
    isLoading: blogIsLoading,
    isError: blogIsError,
  } = useQuery({ queryFn: fetchBlogs, queryKey: QueryKeys.blog });

  if (blogIsLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }
  if (blogIsError) {
    return <p>Error: {blogError.message}</p>;
  }

  console.log("blogData", blogData);
  return (
    <>
      <BreadCrumbs pageName="Add Blog" title="Details" />
      <Box sx={{ margin: "0px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddBlogForm />

        {/* import both table and subject filter  */}
        <Box sx={{ marginTop: "70px" }}>
          <AddBlogTable blogData={blogData} allData={blogData?.length} />
        </Box>
      </Box>
    </>
  );
};

export default AddBlog;
