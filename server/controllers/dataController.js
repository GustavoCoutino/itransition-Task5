import { generateUserData } from "../utils/dataUtils.js";

export const generateData = (req, res) => {
  let { region, errorsPerRecord, seed, startIndex, endIndex } = req.body;
  if (
    !region ||
    errorsPerRecord < 0 ||
    !seed ||
    startIndex < 0 ||
    endIndex < 0
  ) {
    return res.status(400).json({ error: "Invalid input parameters." });
  }
  const data = generateUserData(
    region,
    errorsPerRecord,
    seed,
    startIndex,
    endIndex
  );
  res.json({
    data,
  });
};
