import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // certificates
  addCertificate: "createCertificate",
  getCertificates: "getAllCertificates",
  updateCertificate: "updateCertificateById",
  deleteCertificate: "deleteCertificateById",
};

export const API_URLS = {
  // certificates
  GET_ALL_CERTIFICATE: `${URL}/certificates/${endPoints.getCertificates}`,
  CREATE_CERTIFICATE: `${URL}/certificates/${endPoints.addCertificate}`,
  UPDATE_CERTIFICATE: `${URL}/certificates/${endPoints.updateCertificate}`,
  DELETE_CERTIFICATE: `${URL}/certificates/${endPoints.deleteCertificate}`,
};

export const fetchCertificates = async () => {
  try {
    const url = `${API_URLS.GET_ALL_CERTIFICATE}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createCertificate = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_CERTIFICATE}`;

    const formData = new FormData();
    formData.append("title", postData.get("title"));
    formData.append("date", postData.get("date"));
    formData.append("code", postData.get("code"));

    const certificateImg = postData?.getAll("certificates");
    certificateImg?.forEach((con) => {
      formData?.append("certificates", con); // Append as array
    });

    const response = await client.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while creating the post.");
  }
};

export const deleteCertificate = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_CERTIFICATE}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditCertificate = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("code", values.code);

    if (values.certificates) {
      if (
        typeof values.certificates === "string" &&
        values.certificates.startsWith("data:")
      ) {
        const blob = dataURItoBlob(values.certificates);
        formData.append("certificates", blob);
      } else if (values.certificates instanceof File) {
        formData.append("certificates", values.certificates);
      }
    }

    const url = `${API_URLS.UPDATE_CERTIFICATE}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedCertificateData = await response.json();

      return updatedCertificateData;
    } else {
      console.error("Update failed with status:", response.status);
      throw Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

function dataURItoBlob(dataURI) {
  if (dataURI.startsWith("data:")) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  throw new Error("Input is not a valid data URI.");
}
