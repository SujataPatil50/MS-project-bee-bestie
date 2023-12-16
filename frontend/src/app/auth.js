import axios from "axios";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation", "reset-password"];

  const isPublicPage = PUBLIC_ROUTES.some((route) => window.location.href.includes(route));

  if (!TOKEN && !isPublicPage) {
    window.location.href = '/login';
    return null;
  } else {
    // Code to disable forward button after going back
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

    axios.interceptors.request.use(function (config) {
      document.body.classList.add('loading-indicator');
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      document.body.classList.remove('loading-indicator');
      return response;
    }, function (error) {
      document.body.classList.remove('loading-indicator');
      return Promise.reject(error);
    });

    return TOKEN;
  }
};

export default checkAuth;