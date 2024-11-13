import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const handleDownloadPDF = ({
  doc,
  tableHeading,
  columns,
  rows,
  startY,
  filename = `${tableHeading}.pdf`,
}) => {
  // / Calculate the width of the text
  const textWidth =
    (doc.getStringUnitWidth("AI Paper Format") * doc.internal.getFontSize()) /
    doc.internal.scaleFactor;

  // Calculate the x-coordinate to center the text
  const pageWidth = doc.internal.pageSize.getWidth();
  const x = (pageWidth - textWidth) / 2;
  // Add table heading
  doc.text(tableHeading, x, 10);

  // Add the table to the PDF
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20, // Adjust as needed
    theme: "striped", // Optional theme
    headStyles: {
      textColor: [255, 255, 255], // Header text color
      lineWidth: 0.1, // Border line width
      lineColor: [0, 0, 0], // Border color
      fontSize: 10,
    },
    bodyStyles: {
      lineWidth: 0.1, // Border line width
      lineColor: [0, 0, 0], // Border color
      fontSize: 10,
    },
  });

  // Save the PDF
  doc.save(filename);
};
