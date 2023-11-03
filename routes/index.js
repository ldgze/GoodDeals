import express from "express";
let router = express.Router();

import myDB from "../db/myMongoDB.js";


/* GET home page. */
router.get("/api/deals", async function (req, res) {

  const photos = await myDB.getPhotos();
  res.json({photos});
});

export default router;
