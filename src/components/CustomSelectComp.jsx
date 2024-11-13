import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const CustomSelectComp = ({
  name,
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  MenuProps,
  formik,
}) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        name={name}
        id={id}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        MenuProps={MenuProps}
        // error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        {options ? (
          options.map((option) => (
            <MenuItem key={option[name]} value={option[name]}>
              {option[name]}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No {name} available</MenuItem>
        )}
      </Select>
      {/* Helper Text */}
      {/* <FormHelperText
        style={{
          color: "red", 
          margin:'2px 0 0 5px',
          fontSize:'.7rem'
        }}
      >
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText> */}
    </FormControl>
  );
};

export default CustomSelectComp;
