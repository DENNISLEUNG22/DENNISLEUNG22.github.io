import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/mainEvent", async function (req, res) {
  let result = await client.query("select * from main_event_type");
  res.json(result.rows);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
