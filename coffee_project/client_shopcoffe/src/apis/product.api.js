import http from "../utils/http";
// import upload from "../utils/upload";
export const getAllProduct = (params) =>
  http.get("/v1/product/get-all-product", { params });
export const login = (params) =>
  http.get("/v1/product/get-all-product", { params });
export const getProduct = (slug) =>
  http.get(`/v1/product/get-detail-product?slug=${slug}`);
export const getProductByCategory = (params) =>
  http.get(`/v1/category/get-all-category`, { params });
export const getAllCategory = (params) =>
  http.get("/v1/category/get-category", { params });
export const getPayment = () => http.get("v1/payment/get-payment");
export const loginAccount = (body) => http.post("/v1/auth/login", body);
export const registerAccount = (body) => http.post("/v1/user/register", body);
