const { SlashCommandBuilder } = require("discord.js");
module.exports = {
 ownerOnly: true,
 data: new SlashCommandBuilder()
  .setName("sunucudan-ayril")
  .setDescription("Botu belirtilen sunucudan çıkarır.")
  .addStringOption(o=>o.setName("sunucu_id").setDescription("Sunucu ID").setRequired(true))
  .addStringOption(o=>o.setName("onay").setDescription("İşlemi onaylamak için EVET yaz").setRequired(true)),
 async execute(i, client) {
  const id=i.options.getString("sunucu_id"), onay=i.options.getString("onay");
  if(onay !== "EVET") return i.reply({content:"İşlem iptal edildi. Ayrılmayı onaylamak için onay alanına tam olarak EVET yaz.",ephemeral:true});
  const guild=client.guilds.cache.get(id);
  if(!guild) return i.reply({content:"Bu ID ile sunucu bulunamadı.",ephemeral:true});
  const name=guild.name;
  await i.reply({content:`**${name}** sunucusundan ayrılma işlemi başlatıldı.`,ephemeral:true});
  await guild.leave();
 }
};