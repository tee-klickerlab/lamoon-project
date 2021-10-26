const isEmpty = (arr) => arr.length === 0;

const noMatchingRow = ({ message }) => {
  const splitMessage = message.split(" ");
  return splitMessage[2] === "0";
};

const noAffectingRow = ({ affectedRows }) => affectedRows === 0;

const getArrayLength = (arr) => arr.length;

const incrementCount = (count) => count + 1;

const isDuplicate = (count) => count !== 0;

module.exports = {
  isEmpty,
  isDuplicate,
  noMatchingRow,
  noAffectingRow,
  getArrayLength,
  incrementCount,
};
