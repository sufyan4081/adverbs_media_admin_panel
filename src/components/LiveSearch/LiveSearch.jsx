// import * as React from "react";
// import Checkbox from "@mui/material/Checkbox";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// export default function LiveSearch({
//   name,
//   id,
//   label,
//   options = [], // Default value to ensure options is always an array
//   value,
//   onChange,
//   onBlur,
//   error,
//   helperText,
//   idToName,
//   disabled,
// }) {
//   return (
//     <Autocomplete
//       multiple
//       size="small"
//       id={id}
//       name={name}
//       value={value}
//       onChange={(event, newValue) => {
//         // Ensure only fullName is passed back
//         const fullNames = newValue.map((option) => option?.fullName);
//         onChange({
//           target: { name, value: fullNames },
//         });
//       }}
//       onBlur={onBlur}
//       disableCloseOnSelect
//       getOptionLabel={(option) => option?.fullName || ""} // Ensure option.fullName is always a string
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             icon={icon}
//             checkedIcon={checkedIcon}
//             style={{ marginRight: 8 }}
//             checked={selected}
//             size="small"
//           />
//           {option?.fullName}
//         </li>
//       )}
//       style={{ width: 500 }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           placeholder="Search..."
//           error={error}
//           helperText={helperText}
//           size="small"
//         />
//       )}
//     />
//   );
// }
