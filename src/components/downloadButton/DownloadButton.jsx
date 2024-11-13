import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const DownloadButton = ({
  generateExcel,
  handleDownloadPDF,
  columnFilter,
  handleDownloadExcel,
  handleDownloadExcelEmail,
  ref,
}) => {
  return (
    <>
      <Box>
        {handleDownloadExcelEmail && (
          <Button
            sx={{
              minWidth: "0px !important",
              padding: "0px",
            }}
            onClick={handleDownloadExcelEmail}
          >
            <Tooltip title="Export to Excel (Email)">
              <ForwardToInboxIcon icon={faFileExcel} size="xl" />
            </Tooltip>
          </Button>
        )}
        {handleDownloadExcel && (
          <Button
            sx={{ minWidth: "0px !important", border: 1, mr: 0.5 }}
            onClick={handleDownloadExcel}
          >
            <Tooltip title="Export to Excel">
              <FontAwesomeIcon icon={faFileExcel} size="xl" />
            </Tooltip>
          </Button>
        )}
        {handleDownloadPDF && (
          <Button
            sx={{ minWidth: "0px !important", border: 1, mr: 0.5 }}
            onClick={handleDownloadPDF}
          >
            <Tooltip title="Download the Pdf">
              <FontAwesomeIcon icon={faFilePdf} size="xl" />
            </Tooltip>
          </Button>
        )}
        {columnFilter && (
          <Button
            sx={{
              minWidth: "0px !important",
              border: 1,
              padding: "4px 6px !important",
            }}
            onClick={columnFilter}
          >
            <Tooltip title="Adjust the column">
              <ViewWeekIcon />
            </Tooltip>
          </Button>
        )}
      </Box>
    </>
  );
};

export default DownloadButton;
