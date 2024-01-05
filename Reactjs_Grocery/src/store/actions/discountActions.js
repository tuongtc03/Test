import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllDiscounts,
  createDiscountService,
  deleteDiscountService,
  updateDiscountService,
} from "../../services/discountService";

export const createDiscount = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createDiscountService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo mới giảm giá thành công!");
        dispatch(createDiscountSuccess());
        dispatch(fetchAllDiscountsStart());
      } else {
        toast.error("Tạo mới giảm giá thất bại!");
        dispatch(createDiscountFailed());
      }
    } catch (e) {
      toast.error("Tạo mới giảm giá thất bại!");
      dispatch(createDiscountFailed());
      console.log("createDiscountFailed error ", e);
    }
  };
};

export const createDiscountSuccess = () => ({
  type: actionTypes.CREATE_DISCOUNT_SUCCESS,
});

export const createDiscountFailed = () => ({
  type: actionTypes.CREATE_DISCOUNT_FAILED,
});

export const fetchAllDiscountsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllDiscounts("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllDiscountsSuccess(res.discounts.reverse()));
      } else {
        toast.error("Lấy tất cả giảm giá thất bại!");
        dispatch(fetchAllDiscountsFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả giảm giá thất bại!");
      dispatch(fetchAllDiscountsFailed());
      console.log("fetchAllDiscountsStart error ", e);
    }
  };
};

export const fetchAllDiscountsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DISCOUNTS_SUCCESS,
  discounts: data,
});

export const fetchAllDiscountsFailed = () => ({
  type: actionTypes.FETCH_ALL_DISCOUNTS_FAILED,
});

export const deleteDiscount = (discountId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteDiscountService(discountId);
      if (res && res.errCode === 0) {
        toast.success("Xóa giảm giá thành công!");
        dispatch(deleteDiscountSuccess());
        dispatch(fetchAllDiscountsStart());
      } else {
        toast.error("Xóa giảm giá thất bại!");
        dispatch(deleteDiscountFailed());
      }
    } catch (e) {
      toast.error("Xóa giảm giá thất bại!");
      dispatch(deleteDiscountFailed());
      console.log("deleteDiscount error ", e);
    }
  };
};

export const deleteDiscountSuccess = () => ({
  type: actionTypes.DELETE_DISCOUNT_SUCCESS,
});

export const deleteDiscountFailed = () => ({
  type: actionTypes.DELETE_DISCOUNT_FAILED,
});

export const updateDiscount = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateDiscountService(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật giảm giá thành công!");
        dispatch(updateDiscountSuccess());
        dispatch(fetchAllDiscountsStart());
      } else {
        toast.error("Cập nhật giảm giá thất bại!");
        dispatch(updateDiscountFailed());
      }
    } catch (e) {
      toast.error("Cập nhật giảm giá thất bại!");
      dispatch(updateDiscountFailed());
      console.log("updateDiscount error ", e);
    }
  };
};

export const updateDiscountSuccess = () => ({
  type: actionTypes.EDIT_DISCOUNT_SUCCESS,
});

export const updateDiscountFailed = () => ({
  type: actionTypes.EDIT_DISCOUNT_FAILED,
});
