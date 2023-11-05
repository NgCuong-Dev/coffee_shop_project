import axios from "axios";
import omit from "lodash/omit";
import {
  getAccessTokenFromLS,
  setAccesTokenToLS,
  setProfileFromLS,
} from "./utils.js";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "http://localhost:4001/api/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers["Authorization"] = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use((response) => {
      const { url } = response.config;
      if (url === "/v1/auth/login") {
        const dataProfile = response;
        const newUser = omit(dataProfile.data.user, ["password"]);
        this.accessToken = response.data.token;
        setProfileFromLS(newUser);
        setAccesTokenToLS(this.accessToken);
      } else if (url === "/user/log-out") {
        // Handle log-out logic here
      }
      return response;
    });
  }
}

const http = new Http().instance;

export default http;
