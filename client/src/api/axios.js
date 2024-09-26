import axios from "axios";

//const API_URL = "https://itransition-task5-j2l0.onrender.com";
const API_URL = "http://localhost:5001";

export const fetchUserData = async (
  region,
  errorsPerRecord,
  seed,
  pageNumber
) => {
  try {
    const response = await axios.post(`${API_URL}/api`, {
      region,
      errorsPerRecord,
      seed,
      pageNumber,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
