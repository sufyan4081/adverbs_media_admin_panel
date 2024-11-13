import { client } from "../api-client";
import config from "../../config";
const URL = config.BASE_URL; // REACT_APP_BASE_API_URL_DEV;

const endPoints = {
  // vlog
  addVlog: "createVlog",
  getVlogs: "getAllVlogs",
  updateVlog: "updateVlogById",
  deleteVlog: "deleteVlogById",
};

export const API_URLS = {
  // vlog
  GET_ALL_BLOGS: `${URL}/vlog/${endPoints.getVlogs}`,
  CREATE_BLOG: `${URL}/vlog/${endPoints.addVlog}`,
  UPDATE_VLOG: `${URL}/vlog/${endPoints.updateVlog}`,
  DELETE_VLOG: `${URL}/vlog/${endPoints.deleteVlog}`,
};

export const fetchVlogs = async () => {
  try {
    const url = `${API_URLS.GET_ALL_BLOGS}`;
    const response = await client.get(url);

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const createVlog = async (postData) => {
  try {
    const url = `${API_URLS.CREATE_BLOG}`;

    const formData = new FormData();
    formData.append("headerTitle", postData.get("headerTitle"));
    formData.append("date", postData.get("date"));
    formData.append("url", postData.get("url"));

    // Append videos descriptions
    const videosData = postData.getAll("videos");
    videosData.forEach((v, index) => {
      formData.append("videos", v);
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

export const deleteVlog = async (_id) => {
  try {
    const url = `${API_URLS.DELETE_VLOG}/${_id}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the post.");
  }
};

export const EditVlog = async (_id, values) => {
  try {
    const formData = new FormData();
    formData.append("headerTitle", values.headerTitle);
    formData.append("date", values.date);
    formData.append("url", values.url);

    const url = `${API_URLS.UPDATE_VLOG}/${_id}`;

    // Create the request object
    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const updatedVlogData = await response.json();

      return updatedVlogData;
    } else {
      console.error("Update failed with status:", response.status);
      throw Error(`Update request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
