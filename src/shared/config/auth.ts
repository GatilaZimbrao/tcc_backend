// import dayjs from "dayjs";

import dotenv from "dotenv";
dotenv.config();

export default {
  SECRET: process.env.APP_SECRET || "supersecret",
  // 7 days
  EXPIRESIN: 60 * 60 * 24 * 7,
  // REFRESH_TOKEN_EXPIRATION: dayjs().add(30, "day").unix(),
} as const;
