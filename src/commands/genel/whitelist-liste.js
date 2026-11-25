const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("whitelist-liste").setDescription("Beyaz listedeki kullanıcıları gösterir.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
 async execute(i) {
  const c=await ayarlar(i.guild.id);
  await i.reply({content:c.whitelist.length?c.whitelist.map(id=>`• <@${id}>`).join("\\n"):"Beyaz liste boş.",ephemeral:true});
 }
};