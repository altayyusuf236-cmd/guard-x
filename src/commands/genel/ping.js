const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Botun gecikmesini gösterir."),
  async execute(interaction, client) {
    await interaction.reply({ content: `Pong! API: ${client.ws.ping} ms`, ephemeral: true });
  }
};