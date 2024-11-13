import React, { useState } from "react";
import {
  Box,
  Button,
  FormHelperText,
  Tooltip,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import PreviewIcon from "@mui/icons-material/Preview";
import StudentCSVModal from "../CVSFileModal/StudentCSVModal";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchStudent } from "../../api/student/student_api";
import { fetchStream } from "../../api/addControl/boardType/stream_api";
import { fetchBoards } from "../../api/addControl/boardType/board_api";
import { fetchClass } from "../../api/addControl/boardType/class_api";
import { fetchExam } from "../../api/addControl/boardType/exam_api";
import { fetchBranch } from "../../api/addBranch/branch_api";
import { learningModeOptions } from "../../data/mockData";

const ChooseCSVFile = ({
  label,
  name,
  formik,
  setSelectedFileName,
  selectedFile,
  onValidationComplete,
}) => {
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [verifyCSVFile, setVerifyCSVFile] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [existingPhoneNumbers, setExistingPhoneNumbers] = useState([]);

  const { data: studentsData } = useQuery(QueryKeys.student, fetchStudent);
  const { data: streamData } = useQuery(QueryKeys.stream, fetchStream);
  const { data: boardData } = useQuery(QueryKeys.boards, fetchBoards);
  const { data: classData } = useQuery(QueryKeys.class, fetchClass);
  const { data: examsData } = useQuery(QueryKeys.examType, fetchExam);
  const { data: branchData } = useQuery(QueryKeys.branchKey, fetchBranch);

  console.log("examsData", examsData?.data);
  // Extract phone numbers from fetched data
  React.useEffect(() => {
    if (studentsData) {
      const phoneNumbers = studentsData?.data?.map(
        (student) => student.phoneNumber
      );
      setExistingPhoneNumbers(phoneNumbers);
    }
  }, [studentsData]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue(name, file);
      setSelectedFileName(file.name);
    }
    formik.setFieldValue(name, file);
  };

  const inputKey = selectedFile ? selectedFile.name : "";

  const handleCheckCSV = async (csvFile) => {
    // Define your expected keys
    const expectedKeys = [
      "phoneNumber",
      "fullName",
      "selectedClass",
      "selectedBoard",
      "selectedStream",
      "exams",
      "LearningMode",
      "branch",
    ];

    // Parse the CSV file
    await Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const csvData = results.data;
        const columnArray = [];
        const valuesArray = [];

        results?.data?.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setColumn(columnArray[0]);
        setValues(valuesArray);

        // Check if headers match the expected keys
        const csvHeaders = Object.keys(csvData[0]);
        if (!expectedKeys.every((key) => csvHeaders.includes(key))) {
          setVerifyCSVFile(false);
          // Headers don't match, handle error or show message
          enqueueSnackbar("CSV headers do not match expected keys", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            action: (key) => (
              <Button
                onClick={() => closeSnackbar(key)}
                sx={{ color: "error" }}
              >
                <CloseIcon />
              </Button>
            ),
          });
          return;
        }

        // Check for missing values in any row
        const missingValueErrors = csvData.reduce((acc, row, index) => {
          const missingKeys = expectedKeys.filter((key) => !row[key]);
          if (missingKeys.length > 0) {
            acc.push(
              `Line ${index + 2}: Missing values for keys: ${missingKeys.join(
                ", "
              )}`
            );
          }
          return acc;
        }, []);

        if (missingValueErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for missing values
          enqueueSnackbar(
            `CSV file contains rows with missing values:\n${missingValueErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check for duplicate phone numbers
        const existingPhoneNumbersSet = new Set(existingPhoneNumbers);
        const duplicatePhoneErrors = csvData.reduce((acc, row, index) => {
          if (existingPhoneNumbersSet.has(row.phoneNumber)) {
            acc.push(
              `Line ${index + 2}: Duplicate phone number ${row.phoneNumber}`
            );
          }
          return acc;
        }, []);

        if (duplicatePhoneErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for duplicate phone numbers
          enqueueSnackbar(
            `CSV file contains rows with duplicate phone numbers:\n${duplicatePhoneErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if selectedStream values exist in the database
        const streamSet = new Set(
          streamData?.data?.map((stream) => stream.stream)
        );
        const invalidStreamErrors = csvData.reduce((acc, row, index) => {
          if (!streamSet.has(row.selectedStream)) {
            acc.push(`Line ${index + 2}: Invalid stream ${row.selectedStream}`);
          }
          return acc;
        }, []);

        if (invalidStreamErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid stream values
          enqueueSnackbar(
            `CSV file contains rows with invalid stream values:\n${invalidStreamErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if exams values exist in the database
        const examSet = new Set(examsData?.data?.map((ex) => ex.examName));
        const invalidExamErrors = csvData.reduce((acc, row, index) => {
          const exams = row.exams.split(",").map((exam) => exam.trim());
          const invalidExams = exams.filter((exam) => !examSet.has(exam));
          if (invalidExams.length > 0) {
            acc.push(
              `Line ${index + 2}: Invalid exams ${invalidExams.join(", ")}`
            );
          }
          return acc;
        }, []);

        if (invalidExamErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid exam values
          enqueueSnackbar(
            `CSV file contains rows with invalid exam values:\n${invalidExamErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if selectedBoard values exist in the database
        const boardSet = new Set(boardData?.data?.map((board) => board.name));
        const invalidBoardErrors = csvData.reduce((acc, row, index) => {
          if (!boardSet.has(row.selectedBoard)) {
            acc.push(`Line ${index + 2}: Invalid board ${row.selectedBoard}`);
          }
          return acc;
        }, []);

        if (invalidBoardErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid board values
          enqueueSnackbar(
            `CSV file contains rows with invalid board values:\n${invalidBoardErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if selectedClass values exist in the database
        const classSet = new Set(
          classData?.data?.map((cl) => cl.class.toString())
        );
        const invalidClassErrors = csvData.reduce((acc, row, index) => {
          if (!classSet.has(row.selectedClass)) {
            acc.push(`Line ${index + 2}: Invalid class ${row.selectedClass}`);
          }
          return acc;
        }, []);

        if (invalidClassErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid class values
          enqueueSnackbar(
            `CSV file contains rows with invalid class values:\n${invalidClassErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if branch values exist in the database
        const branchSet = new Set(branchData?.data?.map((b) => b.branchName));
        const invalidBranchErrors = csvData.reduce((acc, row, index) => {
          if (!branchSet.has(row.branch)) {
            acc.push(`Line ${index + 2}: Invalid branch ${row.branch}`);
          }
          return acc;
        }, []);

        if (invalidBranchErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid branch values
          enqueueSnackbar(
            `CSV file contains rows with invalid branch values:\n${invalidBranchErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Check if LearningMode values exist in the database
        const learningModeSet = new Set(
          learningModeOptions?.map((l) => l.value)
        );
        const invalidLearningModeErrors = csvData.reduce((acc, row, index) => {
          if (!learningModeSet.has(row.LearningMode)) {
            acc.push(
              `Line ${index + 2}: Invalid learning mode ${row.LearningMode}`
            );
          }
          return acc;
        }, []);

        if (invalidLearningModeErrors.length > 0) {
          setVerifyCSVFile(false);
          onValidationComplete(false);
          // Show error message for invalid learning mode values
          enqueueSnackbar(
            `CSV file contains rows with invalid learning mode values:\n${invalidLearningModeErrors.join(
              "\n"
            )}`,
            {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "center" },
              action: (key) => (
                <Button
                  onClick={() => closeSnackbar(key)}
                  sx={{ color: "error" }}
                >
                  <CloseIcon />
                </Button>
              ),
            }
          );
          return;
        }

        // Headers match, no duplicate phone numbers, no missing values, all stream, exam, board, class, branch, and learning mode values are valid
        setVerifyCSVFile(true);
        onValidationComplete(true);
      },
      error: (error) => {
        setVerifyCSVFile(false);
        enqueueSnackbar("Error parsing CSV file:", error, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)} sx={{ color: "error" }}>
              <CloseIcon />
            </Button>
          ),
        });
      },
    });
  };

  // for viewModal
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  const handleViewClick = (item) => {
    if (verifyCSVFile) {
      setViewModalOpen(true);
      onValidationComplete(true);
    } else {
      setViewModalOpen(false);
      onValidationComplete(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          justifyItems: "center",
        }}
      >
        <Box>
          <Button
            className="common-button"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            {label}
            <input
              key={inputKey}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
        </Box>
        {formik.values.csvFile && (
          <Box>
            <Tooltip title="View CSV File">
              <PreviewIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleCheckCSV(formik.values.csvFile);
                  handleViewClick("fine"); // Assuming `viewModalOpen` and `handleCloseViewModal` are available in the scope
                }}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box>
        {selectedFile && (
          <Typography style={{ margin: "5px 0" }}>
            You have selected: {selectedFile?.slice(0, 10)}
          </Typography>
        )}
      </Box>

      <Box>
        {formik.touched[name] && formik.errors[name] && (
          <FormHelperText
            style={{
              color: "red",
              margin: "2px 0 0 5px",
              fontSize: ".7rem",
            }}
          >
            {formik.errors[name]}
          </FormHelperText>
        )}
      </Box>
      {viewModalOpen && (
        <StudentCSVModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          values={values}
          column={column}
        />
      )}
    </Box>
  );
};

export default ChooseCSVFile;
