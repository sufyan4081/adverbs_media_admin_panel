import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
import "bootstrap/dist/css/bootstrap.min.css";
import "jspdf-autotable";
import DownloadButton from "../../components/downloadButton/DownloadButton";
import SearchForm from "../../components/SearchForm";
import { userCol } from "../../data/mockData";
import ViewModal from "./ViewModal";
import { QueryKeys } from "../../utils/QueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../../components/DeleteModal";
import ColumnFilter from "../../components/ColumnFilter/ColumnFilter";
import { handleDownloadPDF } from "../../components/DownloadPDF/handleDownloadPDF";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser } from "../../api/User/user_api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.transparent,
    color: theme.palette.common.iconColor,
    textAlign: "center",
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden", // Hide overflowing text
    textOverflow: "ellipsis", // Show ellipsis (...) for overflow
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    textAlign: "center",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    textAlign: "center",
  },
}));

const UserTable = ({ userData }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("userData", userData);

  // For column filtering
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultVisibleColumns = [
    "Full Name",
    "Mobile Number",
    "Company Name",
    "Actions",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);

  const handleToggleColumn = (columnName) => {
    const newVisibleColumns = visibleColumns.includes(columnName)
      ? visibleColumns.filter((col) => col !== columnName)
      : [...visibleColumns, columnName];
    setVisibleColumns(newVisibleColumns);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Media query for small screens
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  // For delete user
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // delete data mutation
  const mutationDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.user });
      enqueueSnackbar("User Deleted Successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} color="success">
            <CloseIcon />
          </Button>
        ),
      });
    },
  });

  const handleDeleteClick = (userId) => {
    setShowDeleteConfirmation(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) mutationDelete.mutate(userIdToDelete);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => setShowDeleteConfirmation(false);

  // For view modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDataForView, setSelectedDataForView] = useState(null);

  const handleViewClick = (item) => {
    setSelectedDataForView(item);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);

  const filteredData = userData?.filter((item) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const iconColor = theme.palette.mode === "dark" ? "white" : "black";
  const transparentColor =
    theme.palette.mode === "dark" ? theme.palette.primary.main : "transparent";

  const totalLength = filteredData?.length || 0;
  console.log("totalLength", totalLength);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  // for download excel sheet
  const handleDownloadExcel = () => {
    const filteredAndVisibleData = paginatedData?.map((item, index) =>
      userCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "subject logo"
        )
        .map((col) => {
          if (col.name === "Full Name" && item.name) {
            return `${item.name}`;
          } else if (col.name === "Mobile Number" && item.mobileNumber) {
            return `${item.mobileNumber}`;
          } else if (col.name === "Email" && item.email) {
            return `${item.email}`;
          } else if (col.name === "Password" && item.password) {
            return `${item.password}`;
          } else if (
            col.name === "Company Name" &&
            item.companyDetails.companyName
          ) {
            return `${item.companyDetails.companyName}`;
          } else if (col.name === "Country" && item.companyDetails.country) {
            return `${item.companyDetails.country}`;
          } else if (col.name === "State" && item.companyDetails.state) {
            return `${item.companyDetails.state}`;
          } else if (col.name === "City" && item.companyDetails.city) {
            return `${item.companyDetails.city}`;
          } else if (col.name === "Pin Code" && item.companyDetails.pinCode) {
            return `${item.companyDetails.pinCode}`;
          } else {
            return "No data available";
          }
        })
    );

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      userCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "images"
        )
        .map((col) => col.name),
      ...filteredAndVisibleData,
    ]);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook
    XLSX.writeFile(wb, "User Data.xlsx");
  };

  // for download PDF
  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();
    const columns = [
      "Sr. No.",
      ...visibleColumns.filter(
        (col) => col !== "Actions" && col.toLowerCase() !== "images"
      ),
    ];
    const rows = paginatedData?.map((item, index) => {
      const rowData = [
        index + 1,
        ...userCol
          .filter(
            (col) =>
              visibleColumns.includes(col.name) &&
              col.name !== "Actions" &&
              col.name.toLowerCase() !== "images"
          )
          .map((col) => {
            if (col.name === "Full Name" && item.name) {
              return `${item.name}`;
            } else if (col.name === "Mobile Number" && item.mobileNumber) {
              return `${item.mobileNumber}`;
            } else if (col.name === "Email" && item.email) {
              return `${item.email}`;
            } else if (col.name === "Password" && item.password) {
              return `${item.password}`;
            } else if (
              col.name === "Company Name" &&
              item.companyDetails.companyName
            ) {
              return `${item.companyDetails.companyName}`;
            } else if (col.name === "Country" && item.companyDetails.country) {
              return `${item.companyDetails.country}`;
            } else if (col.name === "State" && item.companyDetails.state) {
              return `${item.companyDetails.state}`;
            } else if (col.name === "City" && item.companyDetails.city) {
              return `${item.companyDetails.city}`;
            } else if (col.name === "Pin Code" && item.companyDetails.pinCode) {
              return `${item.companyDetails.pinCode}`;
            } else {
              return "No data available";
            }
          }),
      ];

      return rowData;
    });

    handleDownloadPDF({
      doc,
      tableHeading: "User Data",
      columns,
      rows,
    });
  };

  return (
    <div>
      <Box
        sx={{
          margin: "20px 0 10px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Download buttons */}
        <DownloadButton
          columnFilter={handleFilterClick}
          handleDownloadPDF={handleDownloadPDFClick}
          handleDownloadExcel={handleDownloadExcel}
        />

        {/* Search Input */}
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Search by full name"
        />

        {/* Column Filter */}
        <ColumnFilter
          columns={userCol}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: transparentColor,
          border: 1,
          minWidth: "100% !important",
        }}
      >
        <Table aria-label="customized table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Sr.No.
              </StyledTableCell>
              {userCol.map(
                (col, i) =>
                  visibleColumns.includes(col.name) &&
                  col.name !== "Actions" && (
                    <StyledTableCell key={i} align="center">
                      {col.name}
                    </StyledTableCell>
                  )
              )}
              {visibleColumns.includes("Actions") && (
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Actions
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    {startIndex + index + 1}
                  </StyledTableCell>
                  {userCol.map(
                    (col, i) =>
                      visibleColumns.includes(col.name) && (
                        <StyledTableCell align="center" key={i}>
                          {(() => {
                            if (col.name === "Full Name" && item.name) {
                              return `${item.name}`;
                            } else if (
                              col.name === "Mobile Number" &&
                              item.mobileNumber
                            ) {
                              return `${item.mobileNumber}`;
                            } else if (col.name === "Email" && item.email) {
                              return `${item.email}`;
                            } else if (
                              col.name === "Password" &&
                              item.password
                            ) {
                              return `${item.password}`;
                            }
                            // else if (
                            //   col.name.toLowerCase() === "images" &&
                            //   item.images
                            // ) {
                            //   return item?.images?.map((img, idx) => (
                            //     <img
                            //       src={`http://ec2-13-232-51-190.ap-south-1.compute.amazonaws.com:5000${img}`} // Use the image URL here
                            //       alt={`image-${idx}`} // Provide a unique alt text for each image
                            //       style={{
                            //         width: "50px",
                            //         height: "50px",
                            //         marginRight: "10px",
                            //       }} // Styling for the image
                            //     />
                            //   ));
                            // }
                            else if (
                              col.name === "Company Name" &&
                              item.companyDetails.companyName
                            ) {
                              return `${item.companyDetails.companyName}`;
                            } else if (
                              col.name === "Country" &&
                              item.companyDetails.country
                            ) {
                              return `${item.companyDetails.country}`;
                            } else if (
                              col.name === "State" &&
                              item.companyDetails.state
                            ) {
                              return `${item.companyDetails.state}`;
                            } else if (
                              col.name === "City" &&
                              item.companyDetails.city
                            ) {
                              return `${item.companyDetails.city}`;
                            } else if (
                              col.name === "Pin Code" &&
                              item.companyDetails.pinCode
                            ) {
                              return `${item.companyDetails.pinCode}`;
                            } else {
                              return "No data available";
                            }
                          })()}
                        </StyledTableCell>
                      )
                  )}
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => handleViewClick(item)}
                      title="View"
                      size="small"
                      sx={{ minWidth: "30px", padding: "0px" }} // Reduce width and paddings
                    >
                      <VisibilityIcon sx={{ color: iconColor }} />
                    </Button>
                    <Button
                      title="Delete"
                      sx={{ minWidth: "30px", padding: "0px" }}
                    >
                      <DeleteIcon
                        sx={{ color: iconColor }}
                        onClick={() => handleDeleteClick(item._id)}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell
                  colSpan={userCol.length + 2}
                  sx={{ textAlign: "center" }}
                >
                  No matching records found.
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          width: "100%",
          padding: "0px",
          margin: { lg: "0", md: "0", sm: "0", xs: "10px 0px" },
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
          justifyContent: "space-between",
          alignItems: "baseline", // Align items on the baseline
        }}
      >
        {/* Left side content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline", // Align content to baseline
          }}
        >
          <Typography
            sx={{
              pl: 1,
              verticalAlign: "baseline",
              lineHeight: "1.5", // Adjust to match pagination height if necessary
            }}
          >
            Total Users: {totalLength}
          </Typography>
        </Box>

        {/* Right side pagination */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline", // Ensure both sides are on the same baseline
          }}
        >
          {isSmallScreen ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "& .MuiTablePagination-toolbar": {
                  padding: "0px",
                  alignItems: "baseline", // Align toolbar content to baseline
                },
                "& .MuiTablePagination-actions": {
                  padding: "0px",
                  margin: "0px",
                  alignItems: "baseline", // Align actions to baseline
                },
                "& .MuiTablePagination-caption": {
                  lineHeight: "1.5", // Adjust caption line height for alignment
                },
              }}
            />
          ) : (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "& .MuiTablePagination-toolbar": {
                  display: "flex",
                  alignItems: "baseline", // Align toolbar content to baseline
                },
                "& .MuiTablePagination-caption": {
                  lineHeight: "1.5", // Adjust caption line height for better baseline alignment
                },
              }}
            />
          )}
        </Box>
      </Box>

      {/* View modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        data={selectedDataForView}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteModal
        showDeleteConfirmation={showDeleteConfirmation}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default UserTable;
