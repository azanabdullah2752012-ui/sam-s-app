const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MarketplaceProject = require('../models/MarketplaceProject');
const PlannerTool = require('../models/PlannerTool');

// 1. Vision AI Integration (Review Work)
router.post('/review-work', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    // Simulate robust API call with timeout
    const aiResponse = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly simulate success or failure for demonstration
        Math.random() > 0.2 ? resolve({ status: 'success', message: 'Amazing work! 3 Stars! ⭐⭐⭐' }) : reject(new Error('AI API Timeout'));
      }, 2000);
    });

    res.json({ feedback: aiResponse.message });
  } catch (error) {
    console.error('Vision AI Error:', error.message);
    res.status(503).json({ error: 'AI processing failed. Please try again later.' });
  }
});

// 2. Marketplace Purchase Logic
router.post('/marketplace/purchase', async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    
    // For MOCK mode without DB, we just simulate success
    if (process.env.MONGO_URI === 'mock') {
       return res.json({ message: 'Purchase successful (MOCK)!', newBalance: 100 });
    }

    const user = await User.findById(userId);
    const project = await MarketplaceProject.findById(projectId);

    if (!user || !project) {
      return res.status(404).json({ error: 'User or Project not found' });
    }

    if (user.coinBalance < project.cost) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    // Deduct coins and grant access
    user.coinBalance -= project.cost;
    user.purchasedProjects.push(project._id);
    await user.save();

    res.json({ message: 'Purchase successful!', newBalance: user.coinBalance });
  } catch (error) {
    res.status(500).json({ error: 'Server error during purchase' });
  }
});

// 3. Project Planner Submission
router.post('/tools/planner', async (req, res) => {
  try {
    if (process.env.MONGO_URI === 'mock') {
       return res.json({ message: 'Project plan saved successfully (MOCK)!' });
    }

    const { title, materialsNeeded, steps, userId } = req.body;
    const newPlan = new PlannerTool({ title, materialsNeeded, steps, userId });
    await newPlan.save();
    res.json({ message: 'Project plan saved successfully!', plan: newPlan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save project plan' });
  }
});

module.exports = router;
