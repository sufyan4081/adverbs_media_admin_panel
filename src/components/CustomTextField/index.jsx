import { Box, styled, TextField } from "@mui/material";
import { Field } from "formik";

// Create a styled component
const StyledTextField = styled(TextField)(({ theme, isDarkMode }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#90B5D2", // default border color
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: "#90B5D2", // border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#90B5D2", // border color on focus
    },
  },
  "& .MuiInputBase-input": {
    color: isDarkMode ? "white" : "black", // Dynamically set text color
    "&::placeholder": {
      color: "#90B5D2", // set placeholder color
      opacity: 1, // keep placeholder fully visible
    },
  },
}));

export const CustomTextField = ({
  type,
  label,
  name,
  placeholder,
  helperText,
  disabled,
  fieldLabel = true,
  isDarkMode = false,
}) => {
  // Get today's date in 'YYYY-MM-DD' format for setting as minimum date
  const today = new Date().toISOString().split("T")[0];
  const showLabel = fieldLabel ? label : null;
  return (
    <Box sx={{ height: "85px", width: "100%" }}>
      <label htmlFor="outlined-basic">{label}</label>
      <Field
        as={StyledTextField}
        type={type}
        id="outlined-basic"
        label={showLabel}
        variant="outlined"
        size="small"
        disabled={disabled}
        name={name}
        placeholder={type !== "date" ? placeholder : undefined} // Hide placeholder if type is 'date'
        inputProps={
          type === "date" ? { max: today } : {} // Restrict future dates if type is 'date'
        }
        autoComplete="off"
        sx={{ marginTop: "2px", width: "100%" }}
        helperText={helperText} // Pass helperText here
        error={!!helperText} // Show error style if helperText is present
        isDarkMode={isDarkMode}
      />
      {/* {helperText && (
        <Typography
          variant="caption"
          color="error"
          sx={{
            display: "block",
            marginTop: "1px",
            ml: 0,
          }}
        >
          {helperText}
        </Typography>
      )} */}
    </Box>
  );
};
