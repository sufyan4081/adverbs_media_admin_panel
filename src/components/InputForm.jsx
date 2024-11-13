import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import React, { useCallback } from "react";

export const InputForm = React.memo(
  ({ id, type, formik, color, name, disabled, customStyle, placeholder }) => {
    const handleInputChange = useCallback(
      (e) => {
        let value = e.target.value;

        // If the input type is date, format the date to "YYYY-MM-DD"
        if (type === "date") {
          // Parse the date string and convert it to a Date object
          const dateObject = new Date(value);

          // Format the date as "YYYY-MM-DD"
          value = dateObject.toLocaleDateString("en-CA"); // Adjust the locale as needed
        }

        formik.handleChange({
          target: {
            name: name,
            value: value,
          },
        });
      },
      [formik, name, type]
    );

    const handleInputBlur = useCallback(
      (e) => {
        formik.handleBlur(e);
      },
      [formik]
    );

    const today = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format

    return (
      <>
        <div style={{ width: "100%" }}>
          <TextField
            style={{
              ...customStyle,
            }}
            id={id}
            type={type}
            label={placeholder}
            variant="outlined"
            name={name}
            disabled={disabled}
            required
            value={
              formik.values && formik.values[name] != null
                ? formik.values[name].toString()
                : ""
            }
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            fullWidth
            size="small"
            autoComplete="off"
            InputProps={
              type === "date"
                ? {
                    startAdornment: (
                      <InputAdornment position="start">
                        <span role="img" aria-label="calendar">
                          📅
                        </span>
                      </InputAdornment>
                    ),
                  }
                : null
            }
            inputProps={
              type === "date"
                ? {
                    min: today, // Set minimum date to today
                  }
                : {} // Ensure inputProps is defined even if empty for other input types
            }
          />

          {/* Helper Text */}
          <FormHelperText
            style={{
              color: "red",
              margin: "2px 0 0 5px",
              fontSize: ".7rem",
            }}
          >
            {formik.touched[name] && formik.errors[name]}
          </FormHelperText>
        </div>
      </>
    );
  }
);
