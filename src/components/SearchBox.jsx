import { Box, Button, IconButton, InputBase } from "@mui/material";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import CustomSelectComp from "./CustomSelectComp";
import { streamOptions } from "../data/mockData";
import { classOptions } from "../data/mockData";
import { useState } from "react";

const SearchBox = ({ searchQuery, setSearchQuery, data }) => {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const formik = useFormik({
    initialValues: {
      selectedStream: "",
      selectedClass: "",
    },
    onSubmit: (values) => {},
  });

  // Step 3: Event handlers for dropdown changes
  const handleStreamChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    // Reset the batch dropdown when the course changes
    formik.setFieldValue("selectedClass", "");
    setSelectedClass(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const isSelectedStream = formik.values.selectedStream !== "";

  const handleSearch = () => {
    // Use selectedStream and selectedClass to perform the search

    // You can call your search API or update the state accordingly here

    //filter the data on search field
    const filteredData = data.data?.filter((item) =>
      item.fullName.toLowerCase().includes(selectedClass.toLowerCase())
    );
  };
  return (
    <fieldset style={{ border: "1px solid grey" }}>
      <legend
        style={{
          float: "none",
          width: "auto",
          margin: "0 8px 0 5px",
          padding: "0 5px 0 5px",
          fontSize: ".8rem",
        }}
      >
        Search Options
      </legend>
      <Box sx={{ display: "flex", padding: 2 }}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ width: "70%", order: 0 }}>
              <CustomSelectComp
                name="selectedStream"
                id="selectedStream"
                label="Select Stream"
                options={streamOptions}
                value={formik.values.selectedStream}
                onChange={handleStreamChange}
                onBlur={formik.handleBlur}
                MenuProps={MenuProps}
                isStreamSelected={isSelectedStream}
                isDangerousHTML={false} // Set this as needed
              />
              <CustomSelectComp
                name="selectedClass"
                id="selectedClass"
                label="Select Class"
                options={classOptions}
                value={formik.values.selectedClass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                MenuProps={MenuProps}
                isStreamSelected={isSelectedStream}
                isDangerousHTML={true} // Set this as needed
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "3px",
                border: 1,
                ml: 1, // Add margin to separate the search box
                width: "30%",
                order: 1,
                paddingRight: "10px",
              }}
            >
              <InputBase
                sx={{
                  ml: 1, // Add some margin for the input
                  flex: 1, // Expand the input to take available space
                }}
                type="text"
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="button">
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          <Button
            className="common-button"
            type="submit"
            variant="contained"
            sx={{ m: 1, backgroundColor: "blue" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </form>
      </Box>
    </fieldset>
  );
};

export default SearchBox;
