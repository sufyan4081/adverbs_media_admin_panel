import jsPDF from "jspdf";
import "jspdf-autotable";

export async function generatePDF(data, columns, startIndex) {
  const doc = new jsPDF();

  // Function to fetch and convert an image URL to base64
  async function imageUrlToBase64(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          },
          img.type,
          1
        );
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = encodeURI(url);
    });
  }

  const tableData = [];

  for (let index = 0; index < data.length; index++) {
    const row = data[index];
    const rowData = {
      "Sr. No.": startIndex + index + 1,
    };

    for (const col of columns) {
      if (col.dataKey !== "Sr. No.") {
        if (col.dataKey === "image" && row["image"]) {
          try {
            const imageUrl = row["image"];
            if (imageUrl) {
              const imgData = await imageUrlToBase64(imageUrl);
              rowData["image"] = {
                image: imgData,
                width: 40,
                height: 40,
              };
            } else {
              rowData["image"] = "Image URL Missing";
            }
          } catch (error) {
            console.error("Error loading image:", error);
            rowData["image"] = "Image Error: " + error.message;
          }
        } else {
          rowData[col.dataKey] = row[col.dataKey];
        }
      }
    }

    tableData.push(rowData);
  }

  const columnsToDisplay = [
    { header: "Sr. No.", dataKey: "Sr. No." },
    ...columns,
  ];

  doc.autoTable({
    columns: columnsToDisplay,
    body: tableData,
  });

  doc.save("table_data.pdf");
}
