import axios from "axios";

const API_URL = "https://itransition-task5-j2l0.onrender.com";

export const fetchUserData = async (
  region,
  errorsPerRecord,
  seed,
  startIndex,
  endIndex
) => {
  try {
    console.log(import.meta);
    const response = await axios.post(`${import.meta.env.API_URL}/api`, {
      region,
      errorsPerRecord,
      seed,
      startIndex,
      endIndex,
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
