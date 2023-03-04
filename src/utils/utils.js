import moment from "moment";
const { VITE_DATE_FORMAT } = import.meta.env;

const sample = (d = [], fn = Math.random) => {
  if (d.length === 0) return;
  return d[Math.round(fn() * (d.length - 1))];
};

const generateUid = (limit = 11, fn = Math.random) => {
  const allowedLetters = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"].join("");
  const allowedChars = ["0123456789", allowedLetters].join("");
  const arr = [sample(allowedLetters, fn)];
  for (let i = 0; i < limit - 1; i++) {
    arr.push(sample(allowedChars, fn));
  }

  return arr.join("");
};

const convertDisplayValue = (dataItem, value, t) => {
  switch (dataItem.valueType) {
    case "DATE":
      return value ? moment(value).format(VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "YYYY-MM-DD") : "";
    case "TRUE_ONLY":
    case "BOOLEAN":
      return value === "true" ? t("yes") : value === "false" ? t("no") : "";
    default:
      return value;
  }
};

const stringToSlug = (str) => {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};

const sortArrayByProperty = (arr, property) => {
  return arr.sort((a, b) => {
    const nameA = stringToSlug(a[property].toUpperCase()); // ignore upper and lowercase
    const nameB = stringToSlug(b[property].toUpperCase()); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};


const getFirstDateOfWeek = (year, week) => {
  let ordTable = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let ordTableLeap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  let isLeapYear = new Date(new Date(year, 2, 1).setDate(0)).getDate() === 29;
  let ordDiff = isLeapYear ? ordTableLeap : ordTable;
  let correction = (new Date(year, 0, 4).getDay() || 7) + 3;
  let ordDate = week * 7 + (1 - correction);

  if (ordDate < 0) {
    return new Date(year, 0, ordDate);
  }

  let month = 11;

  while (ordDate < ordDiff[month]) {
    month--;
  }

  return new Date(year, month, ordDate - ordDiff[month]);
}

const addDays = (days, date) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export { generateUid, convertDisplayValue, sortArrayByProperty, stringToSlug, getFirstDateOfWeek, addDays };
