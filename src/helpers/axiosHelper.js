import axios from "axios";

const rootAPI = import.meta.env.VITE_ROOT_API;
const userAPI = rootAPI + "/users";

const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
//==================user api

export const postNewAdmin = (data) => {
  return apiProcessor({
    method: "post",
    url: userAPI,
    data,
  });
};
//==================verify email

export const postVerifyEmail = (data) => {
  return apiProcessor({
    method: "post",
    url: userAPI + "/verify-email",
    data,
  });
};
