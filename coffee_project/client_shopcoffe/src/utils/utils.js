export const setCartFromLS = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const getCartFromLS = () => {
  const result = localStorage.getItem("cart");
  return result ? JSON.parse(result) : null;
};
export const setAccesTokenToLS = (access_token) => {
  localStorage.setItem("access_token", access_token);
};
export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";

export const setProfileFromLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
