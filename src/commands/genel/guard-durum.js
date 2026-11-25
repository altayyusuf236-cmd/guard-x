const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("guard-durum").setDescription("Sunucunun Guard ve log ayarlarını gösterir.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
 async execute(i) {
  if (!i.guild) return i.reply({content:"Bu komut sunucuda kullanılabilir.",ephemeral:true});
  const c = await ayarlar(i.guild.id);
  await i.reply({content:`**GUARD X DURUMU**\\nKoruma: ${c.guardEnabled ? "Açık" : "Kapalı"}\\nRaid algılama: ${c.raid.enabled ? "Açık" : "Kapalı"}\\nNormal log: ${c.normalLogChannelId ? `<#${c.normalLogChannelId}>` : "Ayarlanmamış"}\\nKoruma log: ${c.guardLogChannelId ? `<#${c.guardLogChannelId}>` : "Ayarlanmamış"}\\nWhitelist: ${c.whitelist.length} kişi`,ephemeral:true});
 }
};