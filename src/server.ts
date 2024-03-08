import dotenv from "dotenv";

import { createApp } from "./app";
dotenv.config();

const app = createApp();

app.listen(process.env.PORT || 3333, () => {
  console.log("Server online!, Listening on port " + process.env.PORT);
});
