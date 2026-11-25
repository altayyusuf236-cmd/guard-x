const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { sahipKontrol } = require("../../utils/owner");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listservers")
    .setDescription("Botun bulunduğu sunucuları listeler. (Bot sahibi)"),
  async execute(interaction, client) {
    if (!(await sahipKontrol(interaction))) return;

    const sunucular = [...client.guilds.cache.values()];
    const satirlar = sunucular.slice(0, 40).map((guild, index) =>
      `${index + 1}. **${guild.name}**\nID: \`${guild.id}\` · Üye: ${guild.memberCount}`
    );

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`Bağlı sunucular (${sunucular.length})`)
      .setDescription(satirlar.join("\n\n").slice(0, 4000) || "Bot henüz bir sunucuda değil.")
      .setFooter({ text: sunucular.length > 40 ? "İlk 40 sunucu gösteriliyor." : "GUARD X" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
