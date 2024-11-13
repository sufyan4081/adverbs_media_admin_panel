// import { Box, IconButton, InputBase, useTheme } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import { useLocation } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import ProfileIcon from "./UserProfile/ProfileIcon";
// import SettingIcon from "./setting/SettingIcon";
// import { screensData } from "../../data/mockData";

// const Topbar = () => {
//   const theme = useTheme();
//   const colorMode = useContext(ColorModeContext);
//   const colors = tokens(theme.palette.mode);
//   const location = useLocation();

//   // Check if the current route is the login page
//   const isLoginPage = location.pathname === "/";

//   // Conditionally render the header based on the route
//   if (isLoginPage) {
//     return null; // Return null to hide the header
//   }

//   const handleFilter = screensData?.filter((item) =>
//     item?.name?.toLowerCase().startsWith(item)
//   );
//   return (
//     <Box display="flex" justifyContent="space-between" p={2} height="65px">
//       {/* SEARCH BAR */}
//       <Box
//         display="flex"
//         backgroundColor={colors.primary[400]}
//         borderRadius="3px"
//       >
//         {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
//         <IconButton type="button" sx={{ p: 1 }}>
//           <SearchIcon />
//         </IconButton> */}

//         <input
//           type="text"
//           placeholder="search..."
//           onChange={(e) => handleFilter(e.target.value)}
//         />
//       </Box>

//       <div>
//         {handleFilter?.map((item, i) => (
//           <>
//             <p>item.name</p>
//           </>
//         ))}
//       </div>
//       {/* ICONS */}

//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <SettingIcon />
//         <ProfileIcon />
//       </Box>
//     </Box>
//   );
// };

// export default Topbar;
