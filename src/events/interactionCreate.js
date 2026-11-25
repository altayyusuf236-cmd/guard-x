const { kaydet } = require("../utils/logger");
const { botSahibiMi } = require("../utils/owner");
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply({ content: "Bu komut yüklenemedi.", ephemeral: true });
    try {
      if (command.ownerOnly && !botSahibiMi(interaction.user.id))
        return interaction.reply({ content: "Bu komutu yalnızca bot sahibi kullanabilir.", ephemeral: true });
      await command.execute(interaction, client);
      if (interaction.guild) await kaydet(interaction.guild, "command", `/${interaction.commandName} komutu kullanıldı.`, { actorId: interaction.user.id });
    } catch (e) {
      console.error(`[KOMUT ${interaction.commandName}]`, e);
      const msg = { content: "Komut çalıştırılırken bir hata oluştu.", ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(msg).catch(() => null);
      else await interaction.reply(msg).catch(() => null);
    }
  }
};