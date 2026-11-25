const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { token, mongoUri } = require("./config");
const { veritabaninaBaglan } = require("./database");
const { komutlariYukle } = require("./handlers/commands");
const { olaylariYukle } = require("./handlers/events");

async function baslat() {
  await veritabaninaBaglan(mongoUri);

  const client = new Client({
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
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.User]
  });

  client.commands = new Collection();
  komutlariYukle(client);
  olaylariYukle(client);

  client.on("error", hata => console.error("[DISCORD HATASI]", hata));
  process.on("unhandledRejection", hata => console.error("[İŞLENMEYEN PROMISE]", hata));
  process.on("uncaughtException", hata => {
    console.error("[KRİTİK HATA]", hata);
    process.exit(1);
  });

  await client.login(token);
}

baslat().catch(hata => {
  console.error("[BAŞLATMA HATASI]", hata);
  process.exit(1);
});
