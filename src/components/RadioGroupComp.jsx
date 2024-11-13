import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

export default function RadioGroupComp({ label, value }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {value.map((item, i) => (
          <Box key={i}>
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
            />
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
