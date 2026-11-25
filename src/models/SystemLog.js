const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  guildId: { type: String, index: true },
  type: { type: String, required: true, index: true },
  actorId: String,
  targetId: String,
  details: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, index: true }
}, { versionKey: false });

module.exports = mongoose.models.SystemLog || mongoose.model("SystemLog", schema);