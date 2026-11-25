const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("lockdown").setDescription("Sunucudaki yazı kanallarında @everyone mesaj gönderme iznini kapatır.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
 async execute(i) {
  await i.deferReply({ephemeral:true});
  const c=await ayarlar(i.guild.id); c.lockdown=true; await c.save();
  let ok=0, fail=0;
  for(const ch of i.guild.channels.cache.values()){
   if(ch.type!==ChannelType.GuildText && ch.type!==ChannelType.GuildAnnouncement) continue;
   try { await ch.permissionOverwrites.edit(i.guild.roles.everyone,{SendMessages:false},{reason:`Lockdown: ${i.user.tag}`}); ok++; } catch { fail++; }
  }
  await i.editReply(`Lockdown uygulandı. Başarılı: ${ok}, başarısız: ${fail}. Önceki kanal izinleri otomatik yedeklenmedi; açma işlemi izinleri varsayılana döndürür.`);
 }
};