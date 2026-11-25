const mongoose = require("mongoose");

const SystemLogSchema = new mongoose.Schema({
  guildId: { type: String, default: null, index: true },
  actorId: { type: String, default: null, index: true },
  type: { type: String, required: true, index: true },
  description: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model("SystemLog", SystemLogSchema);
