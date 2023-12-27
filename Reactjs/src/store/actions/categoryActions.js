import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllCategories,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
} from "../../services/categoryService"; // Nhớ import hàm từ Service để thực thi get api bằng redux

export const createCategory = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createCategoryService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo mới loại sản phẩm thành công!");
        dispatch(createCategorySuccess());
        dispatch(fetchAllCategoriesStart());
      } else {
        toast.error("Tạo mới loại sản phẩm thất bại!");
        dispatch(createCategoryFailed());
      }
    } catch (e) {
      toast.error("Tạo mới loại sản phẩm thất bại!");
      dispatch(createCategoryFailed());
      console.log("createCategoryFailed error ", e);
    }
  };
};

export const createCategorySuccess = () => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS,
});

export const createCategoryFailed = () => ({
  type: actionTypes.CREATE_CATEGORY_FAILED,
});

export const fetchAllCategoriesStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllCategories("ALL");
      if (res && res.errCode === 0) {
        // Nếu true đi tiếp hàm success với biến truyền vào
        dispatch(fetchAllCategoriesSuccess(res.categories.reverse()));
      } else {
        toast.error("Lấy tất cả loại sản phẩm thất bại!");
        dispatch(fetchAllCategoriesFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả loại sản phẩm thất bại!");
      dispatch(fetchAllCategoriesFailed());
      console.log("fetchAllCategoriesStart error ", e);
    }
  };
};

export const fetchAllCategoriesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS,
  categories: data,
});

export const fetchAllCategoriesFailed = () => ({
  type: actionTypes.FETCH_ALL_CATEGORIES_FAILED,
});

export const deleteCategory = (cateId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCategoryService(cateId);
      if (res && res.errCode === 0) {
        toast.success("Xóa loại sản phẩm thành công!");
        dispatch(deleteCategorySuccess());
        dispatch(fetchAllCategoriesStart());
      } else {
        toast.error("Xóa loại sản phẩm thất bại!");
        dispatch(deleteCategoryFailed());
      }
    } catch (e) {
      toast.error("Xóa loại sản phẩm thất bại!");
      dispatch(deleteCategoryFailed());
      console.log("deleteCategory error ", e);
    }
  };
};

export const deleteCategorySuccess = () => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
});

export const deleteCategoryFailed = () => ({
  type: actionTypes.DELETE_CATEGORY_FAILED,
});

export const updateCategory = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateCategoryService(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật loại sản phẩm thành công!");
        dispatch(updateCategorySuccess());
        dispatch(fetchAllCategoriesStart());
      } else {
        toast.error("Cập nhật loại sản phẩm thất bại!");
        dispatch(updateCategoryFailed());
      }
    } catch (e) {
      toast.error("Cập nhật loại sản phẩm thất bại!");
      dispatch(updateCategoryFailed());
      console.log("updateCategory error ", e);
    }
  };
};

export const updateCategorySuccess = () => ({
  type: actionTypes.EDIT_CATEGORY_SUCCESS,
});

export const updateCategoryFailed = () => ({
  type: actionTypes.EDIT_CATEGORY_FAILED,
});
