const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  coinBalance: { type: Number, default: 100 },
  purchasedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarketplaceProject' }],
});

module.exports = mongoose.model('User', UserSchema);
