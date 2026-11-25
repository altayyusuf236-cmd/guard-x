const { kaydet } = require("../utils/logger");
module.exports = { name: "messageDelete", async execute(message) {
  if (!message.guild || message.author?.bot) return;
  const content = message.content ? message.content.slice(0, 700) : "[İçerik önbellekte yok]";
  await kaydet(message.guild, "message_delete", `${message.author?.tag || "Bilinmeyen kullanıcı"} mesajı silindi. Kanal: <#${message.channelId}>\\nİçerik: ${content}`, { actorId: null, targetId: message.author?.id });
}};