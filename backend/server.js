require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eco-diy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const User = require('./models/User');
const MarketplaceProject = require('./models/MarketplaceProject');
const PlannerTool = require('./models/PlannerTool');

// Routes
app.use('/api/review-work', require('./routes/reviewWork'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/planner', require('./routes/planner'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
