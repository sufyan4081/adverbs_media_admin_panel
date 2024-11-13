// ColumnFilter.js
import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Popover,
  Switch,
  Button,
  TextField,
  useTheme,
} from "@mui/material";

const ColumnFilter = ({
  columns,
  visibleColumns,
  onToggleColumn,
  anchorEl,
  onClose,
}) => {
  const theme = useTheme();
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";
  const itemsPerPage = 5;

  const [searchColumn, setSearchColumn] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const filteredColumns = columns.filter((col) =>
    col.name.toLowerCase().startsWith(searchColumn.toLowerCase())
  );

  const endIndex = startIndex + itemsPerPage;
  const columnsToShow = filteredColumns.slice(startIndex, endIndex);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, filteredColumns.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleSearchChange = (event) => {
    setSearchColumn(event.target.value);
    setStartIndex(0);
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Search Columns"
          variant="standard"
          value={searchColumn}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
          size="small"
        />

        {columnsToShow.map((col, index) => (
          <FormControlLabel
            key={index}
            control={
              <Switch
                checked={visibleColumns.includes(col.name)}
                onChange={() => onToggleColumn(col.name)}
                name={col.name}
                size="small"
                style={{ color: "rgb(45, 51, 89)" }}
              />
            }
            label={<span style={{ fontSize: "12px" }}>{col.name}</span>}
          />
        ))}
        <Box sx={{ marginTop: 1 }}>
          <Button onClick={handlePrev} disabled={startIndex === 0}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={endIndex >= filteredColumns.length}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default ColumnFilter;
