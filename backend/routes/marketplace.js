const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MarketplaceProject = require('../models/MarketplaceProject');

// Purchase a project
router.post('/purchase', async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const user = await User.findById(userId);
    const project = await MarketplaceProject.findById(projectId);
    if (!user || !project) return res.status(404).json({ error: 'User or project not found.' });
    if (user.coinBalance < project.cost) return res.status(400).json({ error: 'Insufficient coins.' });
    user.coinBalance -= project.cost;
    user.purchasedProjects.push(project._id);
    await user.save();
    res.json({ success: true, newBalance: user.coinBalance });
  } catch (err) {
    res.status(500).json({ error: 'Purchase failed.' });
  }
});

module.exports = router;
