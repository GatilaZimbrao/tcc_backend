// import dayjs from "dayjs";

import dotenv from "dotenv";
dotenv.config();

export default {
  SECRET: process.env.APP_SECRET || "supersecret",
  // 7 days
  EXPIRESIN: 60 * 60 * 24 * 7,
} as const;
