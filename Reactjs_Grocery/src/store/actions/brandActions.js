import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllBrands,
  createBrandService,
  deleteBrandService,
  updateBrandService,
} from "../../services/brandService";

export const createBrand = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createBrandService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo mới nhãn hiệu thành công!");
        dispatch(createBrandSuccess());
        dispatch(fetchAllBrandsStart());
      } else {
        toast.error("Tạo mới nhãn hiệu thất bại!");
        dispatch(createBrandFailed());
      }
    } catch (e) {
      toast.error("Tạo mới nhãn hiệu thất bại!");
      dispatch(createBrandFailed());
      console.log("createBrandFailed error ", e);
    }
  };
};

export const createBrandSuccess = () => ({
  type: actionTypes.CREATE_BRAND_SUCCESS,
});

export const createBrandFailed = () => ({
  type: actionTypes.CREATE_BRAND_FAILED,
});

export const fetchAllBrandsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllBrands("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllBrandsSuccess(res.brands.reverse()));
      } else {
        toast.error("Lấy tất cả nhãn hiệu thất bại!");
        dispatch(fetchAllBrandsFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả nhãn hiệu thất bại!");
      dispatch(fetchAllBrandsFailed());
      console.log("fetchAllBrandsStart error ", e);
    }
  };
};

export const fetchAllBrandsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_BRANDS_SUCCESS,
  brands: data,
});

export const fetchAllBrandsFailed = () => ({
  type: actionTypes.FETCH_ALL_BRANDS_FAILED,
});

export const deleteBrand = (brandId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteBrandService(brandId);
      if (res && res.errCode === 0) {
        toast.success("Xóa nhãn hiệu thành công!");
        dispatch(deleteBrandSuccess());
        dispatch(fetchAllBrandsStart());
      } else {
        toast.error("Xóa nhãn hiệu thất bại!");
        dispatch(deleteBrandFailed());
      }
    } catch (e) {
      toast.error("Xóa nhãn hiệu thất bại!");
      dispatch(deleteBrandFailed());
      console.log("deleteBrand error ", e);
    }
  };
};

export const deleteBrandSuccess = () => ({
  type: actionTypes.DELETE_BRAND_SUCCESS,
});

export const deleteBrandFailed = () => ({
  type: actionTypes.DELETE_BRAND_FAILED,
});

export const updateBrand = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateBrandService(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật nhãn hiệu thành công!");
        dispatch(updateBrandSuccess());
        dispatch(fetchAllBrandsStart());
      } else {
        toast.error("Cập nhật nhãn hiệu thất bại!");
        dispatch(updateBrandFailed());
      }
    } catch (e) {
      toast.error("Cập nhật nhãn hiệu thất bại!");
      dispatch(updateBrandFailed());
      console.log("updateBrand error ", e);
    }
  };
};

export const updateBrandSuccess = () => ({
  type: actionTypes.EDIT_BRAND_SUCCESS,
});

export const updateBrandFailed = () => ({
  type: actionTypes.EDIT_BRAND_FAILED,
});
