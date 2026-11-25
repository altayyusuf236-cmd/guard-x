const mongoose = require("mongoose");

const GuildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true, index: true },
  language: { type: String, default: "tr" },
  guardEnabled: { type: Boolean, default: false },
  logChannels: { type: Map, of: String, default: {} },
  whitelistUsers: { type: [String], default: [] },
  whitelistRoles: { type: [String], default: [] },
  whitelistBots: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

GuildConfigSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("GuildConfig", GuildConfigSchema);
