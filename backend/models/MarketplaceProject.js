const mongoose = require('mongoose');

const MarketplaceProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  materials: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  cost: { type: Number, required: true, default: 50 },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('MarketplaceProject', MarketplaceProjectSchema);
