export const getUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("loggedInUser");
};
