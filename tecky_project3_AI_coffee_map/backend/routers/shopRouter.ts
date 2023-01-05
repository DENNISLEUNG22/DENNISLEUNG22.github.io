import express, { Request, Response } from "express";
import { knex } from "../server";

export const shopRouter = express.Router();

shopRouter.get("/shopData", async (req: Request, res: Response) => {
  let data = await knex("shop").select("*");
  return res.json({
    data: data,
  });
});

//this is knex command in psql
//select st_distance(latlng::geometry,'point(22.3177443 114.1725229)'::geometry) as distance from shop order by distance asc limit 10;
shopRouter.get("/shop/by-location", async (req, res) => {
  try {
    //latlng will get from req.query, $1 => ${req.query.lat}
    let position = `point(${req.query.lat} ${req.query.lng})`;
    let shops = await knex("shop")
      .select(
        //copy and paste from google
        knex.raw(`st_distance(latlng::geometry,?::geometry) as distance`, [
          position,
        ]),
        "id",
        "address",
        "latlng"
      )
      .from("shop")
      //用距離排列
      .orderBy("distance", "asc")
      //show 10 個
      .limit(10);
    res.json({ shops });
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});
