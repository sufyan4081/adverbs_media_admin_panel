// import React from "react";
// import AutosizeTextarea from "react-autosize-textarea";

// const AutosizeTextArea = ({ formik, name, placeholder, rows }) => {
//   const isError = formik.touched[name] && Boolean(formik.errors[name]);

//   return (
//     <div style={{ width: "100%" }}>
//       <textarea
//         rows={rows}
//         {...formik.getFieldProps(name)}
//         type="text"
//         placeholder={placeholder}
//         name={name}
//         // value={formik.values.name}
//         style={{
//           width: "100%",
//           borderColor: isError ? "red" : "initial",
//           padding: "5px",
//         }}
//       />
//       {isError && (
//         <div style={{ color: "red", fontSize: ".7rem" }}>
//           {formik.errors[name]}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutosizeTextArea;

const AutosizeTextArea = ({ formik, name, placeholder, rows }) => {
  const isError = formik.touched[name] && Boolean(formik.errors[name]);

  return (
    <div style={{ width: "100%" }}>
      <textarea
        rows={rows}
        {...formik.getFieldProps(name)}
        type="text"
        placeholder={placeholder}
        name={name}
        // value={formik.values[name]} // Make sure to bind the value correctly
        style={{
          width: "100%",
          borderColor: isError ? "red" : "initial",
          padding: "5px",
        }}
      />
      {isError && (
        <div style={{ color: "red", fontSize: ".7rem" }}>
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default AutosizeTextArea;
