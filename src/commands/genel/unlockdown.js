const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("unlockdown").setDescription("Lockdown iznini kaldırır ve everyone mesaj iznini sıfırlar.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
 async execute(i) {
  await i.deferReply({ephemeral:true});
  const c=await ayarlar(i.guild.id); c.lockdown=false; await c.save();
  let ok=0, fail=0;
  for(const ch of i.guild.channels.cache.values()){
   if(ch.type!==ChannelType.GuildText && ch.type!==ChannelType.GuildAnnouncement) continue;
   try { await ch.permissionOverwrites.edit(i.guild.roles.everyone,{SendMessages:null},{reason:`Unlockdown: ${i.user.tag}`}); ok++; } catch { fail++; }
  }
  await i.editReply(`Unlockdown tamamlandı. Başarılı: ${ok}, başarısız: ${fail}. Not: Daha önce özel everyone izinleri varsa sıfırlanmış olabilir.`);
 }
};