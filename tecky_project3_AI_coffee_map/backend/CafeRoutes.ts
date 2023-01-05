import express from "express";
import { CafeController } from "./cafeController";
import { CafeService } from "./cafeService";
import { knex } from "./db";

export const cafeRoutes = express.Router();
const cafeService = new CafeService(knex);
const cafeController = new CafeController(cafeService);

cafeRoutes.get("/cafe/:brand", cafeController.cafeBrand);
