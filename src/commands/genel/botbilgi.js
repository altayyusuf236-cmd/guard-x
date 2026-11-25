const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botbilgi")
    .setDescription("Botun çalışma bilgilerini gösterir."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("GUARD X")
      .setDescription("Türkçe Discord güvenlik ve kayıt sistemi.")
      .addFields(
        { name: "Gecikme", value: `${client.ws.ping} ms`, inline: true },
        { name: "Sunucu sayısı", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Çalışma süresi", value: `${Math.floor(process.uptime())} saniye`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
