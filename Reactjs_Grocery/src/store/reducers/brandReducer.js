import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  brands: [],
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BRANDS_SUCCESS:
      state.brands = action.brands;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BRANDS_FAILED:
      state.brands = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default brandReducer;
