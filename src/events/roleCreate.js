const { kaydet } = require("../utils/logger");
module.exports = { name: "roleCreate", async execute(role) {
  await kaydet(role.guild, "role_create", `Rol oluşturuldu: **${role.name}**`, { targetId: role.id });
}};