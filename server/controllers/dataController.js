import { generateUserData } from "../utils/dataUtils.js";
import seedrandom from "seedrandom";

const generateSevenCharSeed = () => {
  const rng = seedrandom();
  const randomStr = rng().toString().slice(2);
  return randomStr.slice(0, 7);
};

export const generateData = (req, res) => {
  const { region, errorsPerRecord, seed, pageNumber } = req.body;
  const rngSeed = seed || generateSevenCharSeed();
  region, errorsPerRecord, rngSeed, pageNumber;
  if (!rngSeed || !region || errorsPerRecord < 0 || pageNumber < 0) {
    return res.status(400).json({ error: "Invalid input parameters." });
  }
  const data = generateUserData(region, errorsPerRecord, rngSeed, pageNumber);
  res.json({
    seed: rngSeed,
    data,
  });
};
