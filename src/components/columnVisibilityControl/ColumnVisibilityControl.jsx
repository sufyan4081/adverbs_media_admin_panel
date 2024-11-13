import { Box, Switch } from "@mui/material";

export const ColumnVisibilityControl = ({ columns, columnVisibility, toggleColumnVisibility }) => {
    return (
      <Box
        sx={{
          display: "flex",
          marginBottom: "10px",
          flexDirection: "column",
          alignItems:'flex-start'
        }}
      >
        {columns.map((col, i) => (
          <Box key={i} sx={{ display: "inline-block", marginRight: "10px" }}>
            <span>{col}</span>
            <Switch
              checked={columnVisibility[col] || false}
              onChange={() => toggleColumnVisibility(col)}
              size="small"
            />
          </Box>
        ))}
      </Box>
    );
  };