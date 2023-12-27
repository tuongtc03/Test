import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  products: [],
  brands: [],
  topProducts: [],
};

//action là biến được truyền vào từ adminActions
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
      state.products = action.products; // action.products đc lấy từ adminAction
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
      state.products = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_PRODUCTS_SUCCESS:
      state.topProducts = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_PRODUCTS_FAILED:
      state.topProducts = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_BRANDS_BY_CATEID_SUCCESS:
      state.brands = action.brands;
      return {
        ...state,
      };
    case actionTypes.FETCH_BRANDS_BY_CATEID_FAILED:
      state.brands = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default productReducer;
