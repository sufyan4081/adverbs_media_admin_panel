import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Checkbox,
  styled,
} from "@mui/material";

const Image = styled("img")({
  objectFit: "cover",
  width: "20px",
  height: "20px",
  marginRight: "8px",
});

export const CheckmarksSelector = ({
  name,
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  MenuProps,
  isDangerousHTML,
  error,
  helperText,
  idToName,
  disabled,
}) => {
  // Map selected _id to names
  const selectedNames = options
    ?.filter((option) => value?.includes(option?.value))
    ?.map((option) => option?.name);

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        multiple // Set to true for multiple selection
        label={label}
        disabled={disabled}
        MenuProps={MenuProps}
        error={error}
        renderValue={(selected) =>
          idToName ? selectedNames.join(", ") : selected?.join(", ")
        } // Render selected names
      >
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value?.includes(option?.value)} />
              {option.name || "No data available"}
              {option.image && (
                <Image
                  src={`${option.image}`}
                  alt={`Logo ${index}`}
                  crossOrigin="anonymous"
                />
              )}
            </MenuItem>
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
