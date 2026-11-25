const { SlashCommandBuilder } = require("discord.js");
module.exports = {
 ownerOnly: true,
 data: new SlashCommandBuilder().setName("sunucular").setDescription("Botun bulunduğu sunucuları listeler."),
 async execute(i, client) {
  const lines=client.guilds.cache.map(g=>`• ${g.name} — ${g.id} (${g.memberCount} üye)`);
  await i.reply({content:lines.slice(0,40).join("\\n").slice(0,1900)||"Bot hiçbir sunucuda değil.",ephemeral:true});
 }
};