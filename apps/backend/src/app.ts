import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import api from "./api";
import { livekitWebhook } from "./controllers/livekit.controller";
import { subscriptionWebhook } from "./controllers/subscription.controller";
import { connectDB } from "./lib/db";
import * as middlewares from "./middlewares";
import { logResponseData } from "./middlewares";

require("dotenv").config();

const app = express();
connectDB();
// Custom middleware function to log response data

// Register middleware
if (process.env.NODE_ENV === "development") {
  app.use(logResponseData);
}
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.post(
  "/api/webhooks/stripe",
  bodyParser.raw({ type: "application/json" }),
  subscriptionWebhook
);
app.post(
  "/api/webhooks/livekit",
  express.raw({ type: "application/webhook+json" }),
  livekitWebhook
);
app.use(express.json());
app.use("/api/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
