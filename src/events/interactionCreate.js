const { Events } = require("discord.js");
const { kayitOlustur } = require("../utils/logger");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const komut = interaction.client.commands.get(interaction.commandName);
    if (!komut) {
      return interaction.reply({
        content: "Bu komut şu anda kullanılamıyor.",
        ephemeral: true
      }).catch(() => {});
    }

    try {
      await komut.execute(interaction, interaction.client);
      await kayitOlustur({
        guildId: interaction.guildId,
        actorId: interaction.user.id,
        type: "COMMAND_USED",
        description: `/${interaction.commandName} komutu kullanıldı.`,
        details: { command: interaction.commandName }
      });
    } catch (hata) {
      console.error(`[KOMUT HATASI] /${interaction.commandName}`, hata);
      const yanit = {
        content: "Komut çalıştırılırken bir hata oluştu. Hata kayıt altına alındı.",
        ephemeral: true
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(yanit).catch(() => {});
      } else {
        await interaction.reply(yanit).catch(() => {});
      }
    }
  }
};
