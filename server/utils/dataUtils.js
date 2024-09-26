import seedrandom from "seedrandom";
import { fakerEN_US, fakerES_MX, fakerFI, fakerEN } from "@faker-js/faker";

export function generateUserData(region, errorsPerRecord, seed, pageNumber) {
  const faker = getLocale(region);
  const people = [];
  const startIndex = pageNumber === 0 ? 0 : 20 * pageNumber + 1;
  const endIndex = pageNumber == 0 ? startIndex + 20 : startIndex + 10;

  for (let index = startIndex; index < endIndex; index++) {
    const combinedSeed = seed + index;
    const seedValue = seedrandom(combinedSeed).int32();
    faker.seed(seedValue);
    const rng = seedrandom(combinedSeed);

    const identifier = faker.string.uuid();
    let name = `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`;
    let address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()},  ${faker.location.zipCode()}`;
    let phone = faker.phone.imei();
    phone = formatPhoneNumber(phone, region);

    const totalErrors = calculateTotalErrors(errorsPerRecord, rng);

    ({ name, address, phone } = applyErrorsToData(
      name,
      address,
      phone,
      totalErrors,
      region,
      rng
    ));

    people.push({ identifier, index, name, address, phone });
  }

  return people;
}

function applyErrorsToData(name, address, phone, totalErrors, region, rng) {
  if (totalErrors === 0) {
    return { name, address, phone };
  }
  const fields = ["name", "address", "phone"];
  const errorTypes = ["delete", "add", "swap"];
  const regionChars = getRegionCharacters(region);

  let nameArray = name.split("");
  let addressArray = address.split("");
  let phoneArray = phone.split("");

  for (let i = 0; i < totalErrors; i++) {
    const errorType = errorTypes[Math.floor(rng() * errorTypes.length)];
    const fieldIndex = Math.floor(rng() * fields.length);
    const field = fields[fieldIndex];

    let arrayToModify;
    if (field === "name") {
      arrayToModify = nameArray;
    } else if (field === "address") {
      arrayToModify = addressArray;
    } else if (field === "phone") {
      arrayToModify = phoneArray;
    }

    if (arrayToModify.length > 0) {
      const position = Math.floor(rng() * arrayToModify.length);

      switch (errorType) {
        case "delete":
          arrayToModify.splice(position, 1);
          break;

        case "add":
          const charToAdd = regionChars.charAt(
            Math.floor(rng() * regionChars.length)
          );
          arrayToModify.splice(position, 0, charToAdd);
          break;

        case "swap":
          if (position < arrayToModify.length - 1) {
            [arrayToModify[position], arrayToModify[position + 1]] = [
              arrayToModify[position + 1],
              arrayToModify[position],
            ];
          } else if (position > 0) {
            [arrayToModify[position], arrayToModify[position - 1]] = [
              arrayToModify[position - 1],
              arrayToModify[position],
            ];
          }
          break;
      }
    }
  }
  name = nameArray.join("");
  address = addressArray.join("");
  phone = phoneArray.join("");

  return { name, address, phone };
}

function calculateTotalErrors(errorsPerRecord, rng) {
  let integerErrors = Math.floor(errorsPerRecord);
  const fractionalPart = errorsPerRecord - integerErrors;

  if (rng() < fractionalPart) {
    integerErrors += 1;
  }
  return integerErrors;
}

function formatPhoneNumber(phoneNumber, region) {
  let digits = phoneNumber;
  switch (region) {
    case "United_States":
      return (
        "+1 (" +
        digits.slice(0, 3) +
        ") " +
        digits.slice(3, 6) +
        "-" +
        digits.slice(6)
      );
    case "Mexico":
      return (
        "+52 " +
        digits.slice(0, 2) +
        " " +
        digits.slice(2, 6) +
        " " +
        digits.slice(6)
      );
    case "Finland":
      return (
        "+358 " +
        digits.slice(0, 2) +
        " " +
        digits.slice(2, 5) +
        " " +
        digits.slice(5)
      );
    default:
      return phoneNumber;
  }
}

function getLocale(region) {
  switch (region) {
    case "Mexico":
      return fakerES_MX;
    case "United_States":
      return fakerEN_US;
    case "Finland":
      return fakerFI;
    default:
      return fakerEN;
  }
}

function getRegionCharacters(region) {
  switch (region) {
    case "Mexico":
      return "abcdefghijklmnopqrstuvwxyzñáéíóúü";
    case "Finnish":
      return "abcdefghijklmnopqrstuvwxyzäöå";
    case "United_States":
    default:
      return "abcdefghijklmnopqrstuvwxyz";
  }
}
