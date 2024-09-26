import axios from "axios";

const API_URL = "https://itransition-task5-ldy6.onrender.com";

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
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
