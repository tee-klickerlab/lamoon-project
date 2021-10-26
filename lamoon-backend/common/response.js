const payload = (status, payload = defaultError) => ({
  status,
  payload,
});

const createResponse = (res, statusCode, payload) =>
  res.status(statusCode).json(payload);

const defaultError = {
  code: "NO_MATCHING_ROW",
  message: "no matching row",
};

module.exports = {
  payload,
  createResponse,
};
