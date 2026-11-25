const { ownerIds } = require("../config");
function botSahibiMi(userId) { return ownerIds.includes(userId); }
module.exports = { botSahibiMi };