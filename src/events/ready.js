const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[BOT] ${client.user.tag} olarak giriş yapıldı.`);
    client.user.setPresence({
      activities: [{ name: "Sunucu güvenliğini", type: ActivityType.Watching }],
      status: "online"
    });
  }
};
