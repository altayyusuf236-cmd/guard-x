const { SlashCommandBuilder } = require("discord.js");
const { sahipKontrol } = require("../../utils/owner");
const { kayitOlustur } = require("../../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaveserver")
    .setDescription("Botu belirtilen sunucudan çıkarır. (Bot sahibi)")
    .addStringOption(option =>
      option.setName("sunucu_id")
        .setDescription("Ayrılınacak sunucunun ID'si")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("onay")
        .setDescription("İşlemi onaylamak için AYRIL yaz")
        .setRequired(true)),
  async execute(interaction, client) {
    if (!(await sahipKontrol(interaction))) return;

    const guildId = interaction.options.getString("sunucu_id");
    const onay = interaction.options.getString("onay");

    if (onay !== "AYRIL") {
      return interaction.reply({
        content: "İşlem iptal edildi. Onay alanına tam olarak AYRIL yazmalısın.",
        ephemeral: true
      });
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      return interaction.reply({
        content: "Bu ID ile eşleşen bir sunucu bulunamadı.",
        ephemeral: true
      });
    }

    const sunucuAdi = guild.name;
    await kayitOlustur({
      guildId,
      actorId: interaction.user.id,
      type: "OWNER_LEAVE_SERVER",
      description: `Bot sahibi botu ${sunucuAdi} sunucusundan çıkardı.`,
      details: { guildName: sunucuAdi }
    });

    await interaction.reply({
      content: `**${sunucuAdi}** sunucusundan ayrılma işlemi başlatıldı.`,
      ephemeral: true
    });

    await guild.leave();
  }
};
