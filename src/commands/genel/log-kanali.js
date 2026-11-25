const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { ayarlar } = require("../../utils/guildConfig");
module.exports = {
 data: new SlashCommandBuilder().setName("log-kanali").setDescription("Normal olay log kanalını ayarlar.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild).addChannelOption(o=>o.setName("kanal").setDescription("Normal log kanalı").addChannelTypes(ChannelType.GuildText).setRequired(true)),
 async execute(i) {
  const c = await ayarlar(i.guild.id); c.normalLogChannelId=i.options.getChannel("kanal").id; await c.save();
  await i.reply({content:`Normal log kanalı ${i.options.getChannel("kanal")} olarak ayarlandı.`,ephemeral:true});
 }
};