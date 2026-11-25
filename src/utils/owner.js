const { ownerIds } = require("../config");

function botSahibiMi(userId) {
  return ownerIds.includes(userId);
}

async function sahipKontrol(interaction) {
  if (botSahibiMi(interaction.user.id)) return true;

  await interaction.reply({
    content: "Bu komutu yalnızca bot sahibi kullanabilir.",
    ephemeral: true
  });
  return false;
}

module.exports = { botSahibiMi, sahipKontrol };
