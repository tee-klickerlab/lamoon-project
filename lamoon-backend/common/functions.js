const createResponse = (status, payload) => ({ status, payload });

const isEmpty = (arr) => arr.length === 0;

const noMatchingRow = ({ message }) => {
  const splitMessage = message.split(" ");
  return splitMessage[2] === "0";
};

const noAffectingRow = ({ affectedRows }) => affectedRows === 0;

const createError = {
  code: "NO_MATCHING_ROW",
  message: "no matching row",
};

module.exports = {
  createResponse,
  createError,
  isEmpty,
  noMatchingRow,
  noAffectingRow,
};
