const { kaydet } = require("../utils/logger");
module.exports = { name: "channelCreate", async execute(channel) {
  if (channel.guild) await kaydet(channel.guild, "channel_create", `Kanal oluşturuldu: **${channel.name}** (<#${channel.id}>)`, { targetId: channel.id });
}};