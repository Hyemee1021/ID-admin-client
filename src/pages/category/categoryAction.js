import { toast } from "react-toastify";
import { fetchCategories, postCategory } from "../../helpers/axiosHelper";
import { setCatList } from "./categorySlice";

export const getAllCats = () => async (dispatch) => {
  const { status, categories } = await fetchCategories();
  if (status === "success") {
    dispatch(setCatList(categories));
  }
};

export const postNewCat = (obj) => async (dispatch) => {
  const pending = postCategory(obj);
  toast.promise(pending, {
    pending: "please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);
  status === "success" && dispatch(getAllCats());
};
