const initialState = {
  responseBar: {
    status: undefined,
    open: false,
    message: "",
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPENRESPONSE": {
      return {
        ...state,
        responseBar: action.payload,
      };
    }
    case "CLOSERESPONSE": {
      return {
        ...state,
        responseBar: {
          status: undefined,
          open: false,
          message: "",
        },
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
