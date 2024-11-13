import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import ViewModalTitle from "../../components/ViewModalTitle";

const StudentCSVModal = ({ open, onClose, values, column }) => {
  console.log("valuesModal", values);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" data-aos="fade">
      <ViewModalTitle title="Upload Bulk Students" />
      <DialogContent sx={{ padding: "16px" }}>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            margin: "10px auto",
          }}
        >
          <thead>
            <tr>
              {column?.map((col, i) => (
                <th
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    textAlign: "center",
                  }}
                  key={i}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values?.map((v, i) => (
              <tr key={i}>
                {v?.map((value, j) => (
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "center",
                    }}
                    key={j}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentCSVModal;
