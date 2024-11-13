import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ProfileIcon from "../UserProfile/ProfileIcon";
import { sideBarList } from "../../../data/mockData";
import SearchForm from "../../../components/SearchForm";

const Topbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const design = true;

  const handleFilter = () => {
    return sideBarList
      .flatMap((item) => {
        if (item.subDropdownData) {
          return item.subDropdownData;
        }
        if (item.dropdownData) {
          return item.dropdownData.flatMap(
            (subItem) => subItem.subDropdownData || subItem
          );
        }
        return item;
      })
      .filter((subItem) =>
        subItem?.link?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  useEffect(() => {
    setFilteredData(handleFilter());
  }, [searchQuery]);

  useEffect(() => {
    // Clear search query and filter results on route changes
    setSearchQuery("");
    setFilteredData([]);
  }, [location.pathname]);

  // Check current routes and hide topBar
  const isLoginPage = location.pathname === "/";
  const forgotPage = location.pathname === "/forgot-password";

  // Conditionally render the header based on the route
  if (forgotPage || isLoginPage) {
    return null; // Return null to hide the header
  }

  // ----------------------------------------------------------------------------------------------

  return (
    <Box display="flex" justifyContent="space-between" p={2} height="65px">
      {/* SEARCH BAR */}
      <Box>
        <Box>
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            title="search here..."
            design={design}
          />
        </Box>

        {/* RESULTS */}
        <Box
          sx={{
            backgroundColor:
              searchQuery && filteredData.length > 0 ? "whitesmoke" : null,
            padding: "10px",
            maxHeight: "150px",
            overflowY: "auto",
            position: "relative",
            zIndex: "9999",
            width: design
              ? { lg: "250px", md: "200px", sm: "200px", xs: "138px" }
              : { lg: "200px", md: "200px", sm: "200px", xs: "138px" },
          }}
        >
          {searchQuery && filteredData.length > 0
            ? filteredData.map((item) => (
                <Box key={item.id}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={item?.link}
                  >
                    {item?.link}
                  </Link>
                  <hr />
                </Box>
              ))
            : searchQuery && (
                <p
                  style={{
                    backgroundColor: "whitesmoke",
                    // position: "relative",
                    // zIndex: "9999",
                  }}
                >
                  No data found
                </p>
              )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ProfileIcon />
      </Box>
    </Box>
  );
};

export default Topbar;
