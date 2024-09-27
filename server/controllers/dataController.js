import { generateUserData } from "../utils/dataUtils.js";
import seedrandom from "seedrandom";

const generateSevenCharSeed = () => {
  const rng = seedrandom();
  const randomStr = rng().toString().slice(2);
  return randomStr.slice(0, 7);
};

export const generateData = (req, res) => {
  let {
    region,
    errorsPerRecord,
    seed,
    startIndex,
    recordCount,
    usersSize,
    mode,
  } = req.body;
  if (mode === "append" && usersSize === 20) {
    seed = seed + usersSize + 5;
  }
  const rngSeed = seed || generateSevenCharSeed();
  if (!rngSeed || !region || errorsPerRecord < 0) {
    return res.status(400).json({ error: "Invalid input parameters." });
  }
  const data = generateUserData(
    region,
    errorsPerRecord,
    rngSeed,
    startIndex,
    recordCount,
    usersSize
  );
  res.json({
    seed: rngSeed,
    data,
  });
};
