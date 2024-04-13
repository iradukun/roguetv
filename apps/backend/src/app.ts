import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import api from "./api";
import { subscriptionWebhook } from "./controllers/subscription.controller";
import * as middlewares from "./middlewares";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.post(
  "/api/webhooks/stripe",
  bodyParser.raw({ type: "application/json" }),
  subscriptionWebhook
);
app.use(express.json());

app.use("/api/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
