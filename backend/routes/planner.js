const express = require('express');
const router = express.Router();
const PlannerTool = require('../models/PlannerTool');

// Save a new project plan
router.post('/', async (req, res) => {
  try {
    const { userId, title, materials, steps } = req.body;
    const plan = new PlannerTool({ userId, title, materials, steps });
    await plan.save();
    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save plan.' });
  }
});

module.exports = router;
