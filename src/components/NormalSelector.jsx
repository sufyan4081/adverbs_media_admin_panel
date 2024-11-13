import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Image = styled("img")({
  objectFit: "cover",
  width: "20px",
  height: "20px",
  marginRight: "8px",
  crossOrigin: "anonymous",
});

const NormalSelector = ({
  name,
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  MenuProps,
  isDangerousHTML,
  error, // Add error prop
  helperText, // Add helperText prop
}) => {
  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        name={name}
        id={id}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        MenuProps={MenuProps}
        error={error} // Set error prop
      >
        {options && options.length > 0 ? (
          options?.map((option, index) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.name} {option[name]}
              {option.image && (
                <Image
                  src={`${option.image}`}
                  alt="no image"
                  crossOrigin="anonymous"
                />
              )}
            </StyledMenuItem>
          ))
        ) : (
          <MenuItem disabled>No {name} available</MenuItem>
        )}
      </Select>
      {error && (
        <FormHelperText
          style={{
            color: "red",
            margin: "2px 0 0 5px",
            fontSize: ".7rem",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NormalSelector;
