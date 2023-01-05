import express from "express";
import { client } from "./env";

export const classListRouter = express.Router();

classListRouter.get("/getClass", async function (req, res) {
  const event_id = req.query.event_id;
  console.log(`event_id :`, event_id);
  try {
    let result = await client.query(
      /*sql*/
      `select * from users
    inner join training_class on training_class.student_id = users.id 
    where event_id = $1`,
      [event_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
    return;
  }
});
