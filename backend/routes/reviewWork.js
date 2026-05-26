const express = require('express');
const router = express.Router();

// Mock Vision AI endpoint
router.post('/', async (req, res) => {
  try {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Always return a mock result
    res.json({ success: true, message: 'AI review complete (mocked).' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Vision AI error. Please try again.' });
  }
});

module.exports = router;
