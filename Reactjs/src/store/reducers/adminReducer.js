import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  users: [],
};

//action là biến được truyền vào từ adminActions
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      // let copyState = { ...state };
      // copyState.genders = [];
      // copyState.isLoading = false;
      state.genders = [];
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users; // action.users đc lấy từ adminAction
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
