export const LOGIN_DATA = {
  invalidPassword: {
    username: "Admin",
    password: "wrongPassword",
  },

  invalidUsername: {
    username: "WrongUser",
    password: "admin123",
  },

  emptyCredentials: {
    username: "",
    password: "",
  },

  sqlInjection: {
    username: "' OR '1'='1",
    password: "' OR '1'='1",
  },
};
