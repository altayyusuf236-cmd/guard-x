const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun bağlantı gecikmesini gösterir."),
  async execute(interaction, client) {
    await interaction.reply({
      content: `Bağlantı gecikmesi: ${client.ws.ping} ms`,
      ephemeral: true
    });
  }
};
