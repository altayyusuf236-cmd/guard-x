const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("botbilgi").setDescription("GUARD X hakkında bilgi verir."),
  async execute(interaction, client) {
    await interaction.reply({ content: `**GUARD X**\\nSunucu: ${client.guilds.cache.size}\\nKullanıcı: ${client.users.cache.size}\\nDiscord.js: ${require("discord.js").version}`, ephemeral: true });
  }
};