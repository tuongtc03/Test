import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  orders: [],
  payments: [],
  status: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START_LOADING:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_SUCCESS:
      state.payments = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_FAILED:
      state.payments = [];
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_STATUS_SUCCESS:
      state.status = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_STATUS_FAILED:
      state.status = [];
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ORDERS_SUCCESS:
      state.orders = action.orders;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ORDERS_FAILED:
      state.orders = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default orderReducer;
