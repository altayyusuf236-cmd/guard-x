const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true, index: true },
  normalLogChannelId: { type: String, default: null },
  guardLogChannelId: { type: String, default: null },
  whitelist: { type: [String], default: [] },
  guardEnabled: { type: Boolean, default: true },
  lockdown: { type: Boolean, default: false },
  raid: {
    enabled: { type: Boolean, default: true },
    joinLimit: { type: Number, default: 7 },
    windowMs: { type: Number, default: 10000 }
  },
  thresholds: {
    channelDelete: { type: Number, default: 2 },
    roleDelete: { type: Number, default: 2 },
    ban: { type: Number, default: 3 },
    kick: { type: Number, default: 3 }
  }
}, { timestamps: true });

module.exports = mongoose.models.GuildConfig || mongoose.model("GuildConfig", schema);