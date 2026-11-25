const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("whitelist-ekle").setDescription("Bir kullanıcıyı Guard beyaz listesine ekler.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator).addUserOption(o=>o.setName("kullanici").setDescription("Güvenilecek kullanıcı").setRequired(true)),
 async execute(i) {
  const u=i.options.getUser("kullanici"), c=await ayarlar(i.guild.id);
  if(!c.whitelist.includes(u.id)) c.whitelist.push(u.id);
  await c.save(); await i.reply({content:`${u.tag} beyaz listeye eklendi.`,ephemeral:true});
 }
};