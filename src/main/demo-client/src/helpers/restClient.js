import axios from "axios";
import { setConnectionError } from "actions/app";
import store from "store";

// check connection first
function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}

const createClientInstance = () => {
  const defaultOptions = {
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // create an axios instance
  let instance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    function (response) {
      // reset connection error
      store.dispatch(setConnectionError(false));

      return response;
    },
    function (error) {
      if (isNetworkError(error)) {
        store.dispatch(setConnectionError(true));
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const restClient = createClientInstance(setConnectionError);

export default restClient;
