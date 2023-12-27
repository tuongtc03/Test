import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  categories: [],
};

//action là biến được truyền vào từ adminActions
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CATEGORIES_SUCCESS:
      state.categories = action.categories; // action.categories đc lấy từ adminAction
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CATEGORIES_FAILED:
      state.categories = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default categoryReducer;
