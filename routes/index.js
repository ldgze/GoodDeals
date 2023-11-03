import express from "express";
let router = express.Router();

import myDB from "../db/myMongoDB.js";


// GET deals listing
router.get("/api/deals", async function (req, res) {
  try {
    const deals = await myDB.getDeals();
    res.json({ deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new deal
router.post("/api/deals", async function (req, res) {
  try {
    const newDeal = req.body;
    const result = await myDB.createDeal(newDeal);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific deal by id
router.get("/api/deals/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const deal = await myDB.getDealById(id);
    if (deal) {
      res.json(deal);
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update a specific deal by id
router.put("/api/deals/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
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

// DELETE a specific deal by id
router.delete("/api/deals/:id", async function (req, res) {
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
