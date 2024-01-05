import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  discounts: [],
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DISCOUNTS_SUCCESS:
      state.discounts = action.discounts;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DISCOUNTS_FAILED:
      state.discounts = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default discountReducer;
