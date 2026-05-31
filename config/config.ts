import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  baseUrl: process.env.BASE_URL!,
  admin: {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
};
