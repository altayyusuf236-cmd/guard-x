module.exports = {
  name: "ready", once: true,
  execute(client) { console.log(`[BOT] ${client.user.tag} olarak giriş yapıldı.`); }
};