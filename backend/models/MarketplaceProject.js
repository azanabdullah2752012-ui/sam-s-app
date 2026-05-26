const mongoose = require('mongoose');

const MarketplaceProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  materials: [{ type: String }],
  steps: [{ type: String }],
  cost: { type: Number, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('MarketplaceProject', MarketplaceProjectSchema);
