import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckBoxGroup({ options, title }) {
  // Initialize all checkboxes to false
  const initialState = {};
  for (const name in options) {
    initialState[name] = false;
  }

  const [state, setState] = React.useState(initialState);

  const handleChange = (name) => (event) => {
    setState((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
          width: "100%",
          alignItems: {
            lg: "flex-end",
            md: "flex-end",
            sm: "flex-start",
            xs: "flex-start",
          },
        }}
        component="fieldset"
        variant="standard"
      >
        <FormLabel
          sx={{ width: { lg: "13%", md: "18%", sm: "100%" } }}
          component="legend"
        >
          {title}
        </FormLabel>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row !important",
            width: { lg: "87%", md: "87%", sm: "100%", xs: "100%" },
          }}
        >
          {Object.keys(options).map((name) => (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={state[name]}
                  onChange={handleChange(name)}
                  name={name}
                  style={{ color: "blue" }}
                />
              }
              label={options[name]}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
