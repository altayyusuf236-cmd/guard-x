const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("koruma-kanali").setDescription("Koruma olaylarının log kanalını ayarlar.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild).addChannelOption(o=>o.setName("kanal").setDescription("Koruma log kanalı").addChannelTypes(ChannelType.GuildText).setRequired(true)),
 async execute(i) {
  const c = await ayarlar(i.guild.id); c.guardLogChannelId=i.options.getChannel("kanal").id; await c.save();
  await i.reply({content:`Koruma log kanalı ${i.options.getChannel("kanal")} olarak ayarlandı.`,ephemeral:true});
 }
};