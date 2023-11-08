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
    if (result.dealResult.deletedCount === 1) {
      res.json({ message: 'Deal deleted successfully' });
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/api/deals/category/:categoryName', async (req, res) => {
  try {
    const category = req.params.categoryName;
    const deals = await myDB.getDealsByCategory(category);
    res.json(deals);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/api/deals/id/:dealId/comments', async (req, res) => {
  try {
    const { dealId } = req.params;
    const comment = { ...req.body, dealId };
    const result = await myDB.createComment(comment);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/api/deals/id/:dealId/comments', async (req, res) => {
  try {
    const { dealId } = req.params;
    const comments = await myDB.getCommentsByDealId(dealId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/api/deals/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await myDB.deleteComment(commentId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});










export default router;
