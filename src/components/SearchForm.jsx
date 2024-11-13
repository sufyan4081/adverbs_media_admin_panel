import React from "react";
import { tokens } from "../theme";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// function SearchForm({ searchQuery, setSearchQuery, title, design }) {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box
//       sx={{
//         width: design
//           ? { lg: "250px", md: "200px", sm: "200px", xs: "138px" }
//           : { lg: "200px", md: "200px", sm: "200px", xs: "138px" },
//         border: 1,
//         height: "35px",
//         display: "flex",
//         backgroundColor: colors.primary[400], // Corrected this line
//         borderRadius: "3px",
//       }}
//     >
//       <InputBase
//         sx={{ ml: 1 }}
//         type="text"
//         placeholder={title}
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <IconButton type="button" sx={{ ml: design && "30px" }}>
//         <SearchIcon />
//       </IconButton>
//     </Box>
//   );
// }

function SearchForm({ searchQuery, setSearchQuery, title, design }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Conditionally define functions based on the design variable
  const handleInputChange = design
    ? (event) => {
        // Replace spaces with hyphens and set the search query
        const modifiedQuery = event.target.value.replace(/\s+/g, "-");
        setSearchQuery(modifiedQuery);
      }
    : undefined;

  const handleSubmit = design
    ? (event) => {
        event.preventDefault();
        // Call the setSearchQuery function to trigger the search
        setSearchQuery(event.target.searchInput.value);
      }
    : undefined;

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: design
            ? { lg: "250px", md: "200px", sm: "200px", xs: "138px" }
            : { lg: "200px", md: "200px", sm: "200px", xs: "138px" },
          border: 1,
          height: "35px",
          display: "flex",
          backgroundColor: colors.primary[400],
          borderRadius: "3px",
        }}
      >
        <InputBase
          sx={{ ml: 1 }}
          type="text"
          name="searchInput"
          placeholder={title}
          value={searchQuery}
          onChange={
            design ? handleInputChange : (e) => setSearchQuery(e.target.value)
          }
        />
        <IconButton type="submit" sx={{ ml: design && "30px" }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
}

export default SearchForm;
