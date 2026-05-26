const mongoose = require('mongoose');

const PlannerToolSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  materials: [{ type: String }],
  steps: [{ type: String }],
});

module.exports = mongoose.model('PlannerTool', PlannerToolSchema);
