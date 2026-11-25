const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { token, mongoUri, port } = require("./config");
const { veritabaninaBaglan } = require("./database");
const { olaylariYukle } = require("./handlers/events");
const { komutlariYukle } = require("./handlers/commands");

const app = express();
app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false }));
app.get("/", (_req, res) => res.status(200).send("GUARD X aktif."));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok", bot: client?.isReady() || false }));
let client;

async function baslat() {
  await veritabaninaBaglan(mongoUri);
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildEmojisAndStickers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.User]
  });
  client.commands = new Collection();
  komutlariYukle(client);
  olaylariYukle(client);
  await client.login(token);
  app.listen(port, "0.0.0.0", () => console.log(`[WEB] Sağlık endpointi ${port} portunda hazır.`));
}

process.on("unhandledRejection", e => console.error("[UNHANDLED]", e));
process.on("uncaughtException", e => { console.error("[UNCAUGHT]", e); });
baslat().catch(e => { console.error("[BAŞLATMA HATASI]", e); process.exit(1); });