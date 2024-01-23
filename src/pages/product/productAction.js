import { toast } from "react-toastify";
import {
  fetchProducts,
  postProduct,
  updateProduct,
} from "../../helpers/axiosHelper";
import { setProductList, setSelectedProduct } from "./productSlice";

export const getAllProducts = () => async (dispatch) => {
  const { status, products } = await fetchProducts();

  if (status === "success") {
    dispatch(setProductList(products));
  }
};
export const getAProduct = (_id) => async (dispatch) => {
  const { status, products } = await fetchProducts(_id);

  if (status === "success") {
    dispatch(setSelectedProduct(products));
  }
};

export const postAProduct = (data) => async (dispatch) => {
  const pending = postProduct(data);

  toast.promise(pending, {
    pending: "Please wait...",
  });
  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    // dispatch(getAllProducts());
  }
};

export const updateAProduct = (_id, data) => async (dispatch) => {
  const pending = updateProduct(data); // todo

  toast.promise(pending, {
    pending: "Please wait...",
  });
  const { status, message } = await pending;
  toast[status](message);

  if (status === "success") {
    dispatch(getAProduct(_id));
  }
};
