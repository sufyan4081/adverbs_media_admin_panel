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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import DownloadButton from "../../components/downloadButton/DownloadButton";
import SearchForm from "../../components/SearchForm";
import { addCertificateCol } from "../../data/mockData";
import ViewModal from "./ViewModal";
import EditDialogs from "../../components/EditDialogs/EditDialogs";
import { QueryKeys } from "../../utils/QueryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteModal from "../../components/DeleteModal";
import ColumnFilter from "../../components/ColumnFilter/ColumnFilter";
import { handleDownloadPDF } from "../../components/DownloadPDF/handleDownloadPDF";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { styled } from "@mui/material/styles";
import { deleteCertificate } from "../../api/Certificate/certificate_api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.transparent,
    color: theme.palette.common.iconColor,
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
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AddCertificateTable = ({ certificateData, allData }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultVisibleColumns = ["Title", "Code", "Images", "Actions"];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Media query for small screens
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // delete data mutation
  const mutationDelete = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.certificate });
      enqueueSnackbar("Data deleted successfully", {
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

  // ---------------------------------------filter column end -----------------------------

  const handleDeleteClick = (userId) => {
    setShowDeleteConfirmation(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      mutationDelete.mutate(userIdToDelete);
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDataForView, setSelectedDataForView] = useState(null);

  const handleViewClick = (item) => {
    setSelectedDataForView(item);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  const handleEditClick = (formData) => {
    setSelectedFormData(formData);
    setIsEditOpen(true);
  };

  const filteredData = certificateData?.filter((item) =>
    item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const iconColor = theme.palette.mode === "dark" ? "white" : "black";
  const transparentColor =
    theme.palette.mode === "dark" ? theme.palette.primary.main : "transparent";

  const totalLength = filteredData && filteredData?.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedData = filteredData?.slice(startIndex, endIndex);

  const handleDownloadExcel = () => {
    const filteredAndVisibleData = paginatedData?.map((item) =>
      addCertificateCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "images"
        )
        .map((col) => {
          if (col.name.toLowerCase() === "title" && item?.title) {
            return `${item?.title}`;
          } else if (col.name.toLowerCase() === "code" && item?.code) {
            return `${item?.code}`;
          } else if (col.name.toLowerCase() === "date" && item.date) {
            return `${item?.date.slice(0, 10)}`;
          } else {
            return "No data available";
          }
        })
    );

    const ws = XLSX.utils.aoa_to_sheet([
      addCertificateCol
        .filter(
          (col) =>
            visibleColumns.includes(col.name) &&
            col.name !== "Actions" &&
            col.name.toLowerCase() !== "image"
        )
        .map((col) => col.name),
      ...filteredAndVisibleData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Certificate Data.xlsx");
  };

  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();
    const columns = [
      "Sr. No.",
      ...visibleColumns.filter(
        (col) => col !== "Actions" && col.toLowerCase() !== "image"
      ),
    ];
    const rows = paginatedData?.map((item, index) => {
      const rowData = [
        index + 1,
        ...addCertificateCol
          .filter(
            (col) =>
              visibleColumns.includes(col.name) &&
              col.name !== "Actions" &&
              col.name.toLowerCase() !== "images"
          )
          .map((col) => {
            if (col.name.toLowerCase() === "title" && item?.title) {
              return `${item?.title}`;
            } else if (col.name.toLowerCase() === "code" && item?.code) {
              return `${item?.code}`;
            } else if (col.name.toLowerCase() === "date" && item.date) {
              return `${item?.date.slice(0, 10)}`;
            } else {
              return "No data available";
            }
          }),
      ];

      return rowData;
    });

    handleDownloadPDF({
      doc,
      tableHeading: "Certificate Data",
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
        <DownloadButton
          columnFilter={handleFilterClick}
          handleDownloadPDF={handleDownloadPDFClick}
          handleDownloadExcel={handleDownloadExcel}
        />

        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Search by title name"
        />

        <ColumnFilter
          columns={addCertificateCol}
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
              <StyledTableCell align="center">Sr.No.</StyledTableCell>
              {addCertificateCol.map(
                (col, i) =>
                  visibleColumns.includes(col.name) &&
                  col.name !== "Actions" && (
                    <StyledTableCell key={i} align="center">
                      {col.name}
                    </StyledTableCell>
                  )
              )}
              {visibleColumns.includes("Actions") && (
                <StyledTableCell align="center">Actions</StyledTableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {startIndex + index + 1}
                  </StyledTableCell>
                  {addCertificateCol.map(
                    (col, i) =>
                      visibleColumns.includes(col.name) && (
                        <StyledTableCell key={i} align="center">
                          {(() => {
                            if (
                              col.name.toLowerCase() === "title" &&
                              item?.title
                            ) {
                              return `${item?.title}`;
                            } else if (
                              col.name.toLowerCase() === "code" &&
                              item?.code
                            ) {
                              return `${item?.code}`;
                            } else if (
                              col.name.toLowerCase() === "images" &&
                              item.certificates
                            ) {
                              return item.certificates?.map((img, idx) => (
                                <img
                                  key={idx} // Add a unique key for each image
                                  src={`http://ec2-13-232-51-190.ap-south-1.compute.amazonaws.com:5000${img}`}
                                  alt={`image-${idx}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                  }}
                                />
                              ));
                            } else if (
                              col.name.toLowerCase() === "date" &&
                              item.date
                            ) {
                              return `${item?.date.slice(0, 10)}`;
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
                      onClick={() => handleEditClick(item)}
                      title="Edit"
                      sx={{ minWidth: "30px", padding: "0px" }}
                    >
                      <ModeEditIcon sx={{ color: iconColor }} />
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
                  colSpan={addCertificateCol.length + 2}
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
            Total Certificate: {totalLength}
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
              count={allData}
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

      {/* Edit modal */}
      <EditDialogs
        formData={selectedFormData}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Certificate"
        tableName="Certificate"
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

export default AddCertificateTable;
