import { Types } from "../types/Types";

const initialState = {
  lends: [],
  count: 0,
  lendsState: "",
  currentLend: "",
};

export const LendReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LENDS_LOADED:
      return {
        ...state,
        lends: [...action.payload.lends],
        count: action.payload.count,
        lendsState: action.payload.lendsState,
      };

    case Types.LENDS_LOADED_BY_COLLABORATOR:
      return {
        ...state,
        lends: [...action.payload.lends],
        count: action.payload.count,
        lendsState: null,
      };

    case Types.LEND_SET_ACTIVE:
      return {
        ...state,
        currentLend: action.payload,
      };

    case Types.LEND_CLEAR_ACTIVE:
      return {
        ...state,
        currentLend: null,
      };

    case Types.LEND_DELETED:
      return {
        ...state,
        lends: state.lends.filter((e) => e._id !== state.lends._id),
        currentLend: null,
      };

    case Types.ADD_FEE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case Types.LEND_CHANGE_FEE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
