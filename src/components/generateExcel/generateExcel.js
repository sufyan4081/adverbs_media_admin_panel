import * as XLSX from "xlsx";

export function generateExcel(data, imageColumn, columns, startIndex) {
  // Create a new Excel workbook
  const workbook = XLSX.utils.book_new();

  // Exclude the image column from the data
  const excelData = data.map((row, index) => {
    const { [imageColumn]: omit, ...rest } = row;
    return {
      "Sr.No.": index + 1,
      ...rest,
    };
  });

  // Create a worksheet and add data to it
  let worksheet;
  if (Array.isArray(columns) && columns.length > 0) {
    worksheet = XLSX.utils.json_to_sheet(excelData, {
      header: ["Sr.No.", ...columns.filter((col) => col !== imageColumn)],
      width: 30,
    });
  } else {
    // If 'columns' is a string, create a single-cell header
    const columnHeader = typeof columns === "string" ? [columns] : columns;
    worksheet = XLSX.utils.json_to_sheet(excelData, {
      header: ["Sr.No.", ...columnHeader],
      width: 15,
    });
  }

  // Automatically adjust column widths based on content
  const colWidths = {};
  excelData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      colWidths[key] = Math.max(colWidths[key] || 0, String(row[key]).length);
    });
  });

  // Set column widths in the worksheet
  Object.keys(colWidths).forEach((key, index) => {
    worksheet["!cols"][index + 1] = { width: colWidths[key] };
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Save the Excel workbook
  XLSX.writeFile(workbook, "table.xlsx");
}
