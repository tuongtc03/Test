import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllOrders,
  createOrderService,
  deleteOrderService,
  updateOrderService,
  getAllCodeService,
} from "../../services/orderService";

export const fetchPaymentMethodStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch(fetchPaymentMethodSuccess(res.data));
      } else {
        dispatch(fetchPaymentMethodFailed());
      }
    } catch (e) {
      dispatch(fetchPaymentMethodFailed());
      console.log("fetchPaymentMethodStart error ", e);
    }
  };
};

export const fetchPaymentMethodSuccess = (data) => ({
  type: actionTypes.FETCH_PAYMENT_SUCCESS,
  data: data,
});

export const fetchPaymentMethodFailed = () => ({
  type: actionTypes.FETCH_PAYMENT_FAILED,
});

export const fetchStatusStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllCodeService("STATUS");
      if (res && res.errCode === 0) {
        dispatch(fetchStatusSuccess(res.data));
      } else {
        dispatch(fetchStatusFailed());
      }
    } catch (e) {
      dispatch(fetchStatusFailed());
      console.log("fetchStatusStart error ", e);
    }
  };
};

export const fetchStatusSuccess = (data) => ({
  type: actionTypes.FETCH_STATUS_SUCCESS,
  data: data,
});

export const fetchStatusFailed = () => ({
  type: actionTypes.FETCH_STATUS_FAILED,
});

export const createOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createOrderService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo mới đơn hàng thành công!");
        dispatch(createOrderSuccess());
        dispatch(fetchAllOrdersStart());
      } else {
        toast.error("Tạo mới đơn hàng thất bại!");
        dispatch(createOrderFailed());
      }
    } catch (e) {
      toast.error("Tạo mới đơn hàng thất bại!");
      dispatch(createOrderFailed());
      console.log("create error", e);
    }
  };
};

export const createOrderSuccess = () => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
});

export const createOrderFailed = () => ({
  type: actionTypes.CREATE_ORDER_FAILED,
});

export const fetchAllOrdersStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllOrders("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllOrdersSuccess(res.orders.reverse()));
      } else {
        toast.error("Lấy tất cả đơn hàng thất bại!");
        dispatch(fetchAllOrdersFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả đơn hàng thất bại!");
      dispatch(fetchAllOrdersFailed());
      console.log("fetchAllStart error ", e);
    }
  };
};

export const fetchAllOrdersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_ORDERS_SUCCESS,
  orders: data,
});

export const fetchAllOrdersFailed = () => ({
  type: actionTypes.FETCH_ALL_ORDERS_FAILED,
});

export const deleteOrder = (productId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteOrderService(productId);
      if (res && res.errCode === 0) {
        toast.success("Xóa đơn hàng thành công!");
        dispatch(deleteOrderSuccess());
        dispatch(fetchAllOrdersStart());
      } else {
        toast.error("Xóa đơn hàng thất bại!");
        dispatch(deleteOrderFailed());
      }
    } catch (e) {
      toast.error("Xóa đơn hàng thất bại!");
      dispatch(deleteOrderFailed());
      console.log("delete error ", e);
    }
  };
};

export const deleteOrderSuccess = () => ({
  type: actionTypes.DELETE_ORDER_SUCCESS,
});

export const deleteOrderFailed = () => ({
  type: actionTypes.DELETE_ORDER_FAILED,
});

export const updateOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateOrderService(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật đơn hàng thành công!");
        dispatch(updateOrderSuccess());
        dispatch(fetchAllOrdersStart());
      } else {
        toast.error("Cập nhật đơn hàng thất bại!");
        dispatch(updateOrderFailed());
      }
    } catch (e) {
      toast.error("Cập nhật đơn hàng thất bại!");
      dispatch(updateOrderFailed());
      console.log("update error ", e);
    }
  };
};

export const updateOrderSuccess = () => ({
  type: actionTypes.EDIT_ORDER_SUCCESS,
});

export const updateOrderFailed = () => ({
  type: actionTypes.EDIT_ORDER_FAILED,
});
