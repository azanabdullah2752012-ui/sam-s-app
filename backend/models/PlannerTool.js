const mongoose = require('mongoose');

const PlannerToolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  materialsNeeded: [{ type: String }],
  steps: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('PlannerTool', PlannerToolSchema);
