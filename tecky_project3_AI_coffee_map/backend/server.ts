import express, { Request, Response } from "express";
// import expressSession from 'express-session'
import { print } from "listening-on";
import cors from "cors";
import Knex from "knex";
import { shopRouter } from "./routers/shopRouter";
import { cafeRoutes } from "./CafeRoutes";

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.get("/yo", (req: Request, res: Response) => {
  return res.json({ data: "Hello World" });
});

app.use(cafeRoutes);
app.use(shopRouter);

app.use(express.static("Public"));
const PORT = 8080;

app.listen(PORT, () => {
  print(PORT);
});
