const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("whitelist-sil").setDescription("Kullanıcıyı beyaz listeden çıkarır.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator).addUserOption(o=>o.setName("kullanici").setDescription("Çıkarılacak kullanıcı").setRequired(true)),
 async execute(i) {
  const u=i.options.getUser("kullanici"), c=await ayarlar(i.guild.id);
  c.whitelist=c.whitelist.filter(id=>id!==u.id); await c.save();
  await i.reply({content:`${u.tag} beyaz listeden çıkarıldı.`,ephemeral:true});
 }
};