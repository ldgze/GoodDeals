import express from "express";
const router = express.Router();

import myDB from "../db/myMongoDB.js";

// get all posts
router.get("/api/deals", async function (req, res) {
  try {
    const deals = await myDB.getDeals();
    res.json({ deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/deals/deal', async (req, res) => {
  const newDeal = req.body;
  try {
      const result = await myDB.createDeal(newDeal);
      res.status(201).json({ success: true, dealId: result.insertedId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


router.get("/api/deals/id/:id", async (req, res) => {
  try {
    console.log(1111111111111111112)
    console.log(req.params)
    console.log(req.params.id)
    const deal = await myDB.getDealById(req.params.id);
    if (deal) {
      res.json(deal);
    } else {
      res.status(404).json({ success: false, message: "Deal not found" });
    }
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.put("/api/deals/id/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    // console.log(id)
    console.log(updateData)
    const result = await myDB.updateDeal(id, updateData);
    if (result.modifiedCount === 1) {
      res.json({ message: 'Deal updated successfully' });
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/deals/id/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await myDB.deleteDeal(id);
    if (result.deletedCount === 1) {
      res.json({ message: 'Deal deleted successfully' });
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
