import dotenv from "dotenv";

import { createApp } from "./app";
dotenv.config();

const app = createApp();

const port = Number(process.env.PORT) || 3333;
app.listen(port, "0.0.0.0", () => {
  console.log("Server online!, Listening on port " + port);
});

const portDown = async () => {
  process.exit();
};

process.on("SIGINT", portDown);
process.on("SIGUSR1", portDown);
process.on("SIGUSR2", portDown);
process.on("SIGTERM", portDown);
