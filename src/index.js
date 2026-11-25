
const express = require("express");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const { token, mongoUri, port } = require("./config");
const { veritabaninaBaglan } = require("./database");
const { komutlariYukle } = require("./handlers/commands");
const { olaylariYukle } = require("./handlers/events");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("GUARD X aktif.");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    durum: "aktif",
    bot: client?.isReady() ? "çevrimiçi" : "başlatılıyor"
  });
});

let client;

app.listen(port, "0.0.0.0", () => {
  console.log(`[SUNUCU] Port ${port} üzerinde çalışıyor.`);
});

async function baslat() {
  await veritabaninaBaglan(mongoUri);

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildIntegrations
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.GuildMember,
      Partials.User
    ]
  });

  client.commands = new Collection();

  komutlariYukle(client);
  olaylariYukle(client);

  client.on("error", hata => {
    console.error("[DISCORD HATASI]", hata);
  });

  process.on("unhandledRejection", hata => {
    console.error("[İŞLENMEYEN PROMISE]", hata);
  });

  await client.login(token);
}

baslat().catch(hata => {
  console.error("[BAŞLATMA HATASI]", hata);
  process.exit(1);
});
