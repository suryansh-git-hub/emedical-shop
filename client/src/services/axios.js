import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // The auth token now lives in an httpOnly
  // cookie set by the server (not
  // localStorage). withCredentials tells
  // the browser to include that cookie on
  // every request, even though our
  // frontend and backend are on different
  // domains.
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Drop empty/null/undefined query params
    // so URLs don't show things like
    // "?search=&page=1" when no filter is
    // actually applied. Purely cosmetic /
    // cleaner network logs - the backend
    // already treats a missing search the
    // same as an empty one.
    if (config.params) {
      Object.keys(config.params).forEach(
        (key) => {
          const value = config.params[key];

          if (
            value === "" ||
            value === null ||
            value === undefined
          ) {
            delete config.params[key];
          }
        }
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear any leftover local user info
      // and send them back to login. The
      // actual auth cookie, if invalid or
      // expired, is the server's to clear.
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;