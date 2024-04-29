import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  timeout: 3000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return {
        code: -1,
        msg: "未知错误",
        data: null,
      };
    }
  },
  (error) => Promise.reject(error)
);

export default instance;
