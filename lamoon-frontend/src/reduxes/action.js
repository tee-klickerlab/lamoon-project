export const openResponseBar = (data) => ({
  type: "OPENRESPONSE",
  payload: data,
});

export const closeResponseBar = () => ({
  type: "CLOSERESPONSE",
});
