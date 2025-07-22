import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const {
  DISCORD_TOKEN,
  DAT_HOST_EMAIL,
  DAT_HOST_PASSWORD,
  TRACK_SERVER_ID,
  TRACK_CHANNEL_ID,
  TRACK_INTERVAL_SEC
} = process.env;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Monta cabeçalho Basic Auth para DatHost
const dhToken = Buffer.from(
  `${DAT_HOST_EMAIL}:${DAT_HOST_PASSWORD}`
).toString("base64");
const DH_HEADERS = {
  Authorization: `Basic ${dhToken}`,
  Accept: "application/json",
};

// Função para formatar o local
function formatLocation(loc) {
  if (!loc) return "";
  if (loc.toLowerCase() === "sao_paulo") return "São Paulo";
  return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
}

async function buildEmbed() {
  const res = await fetch(
    `https://dathost.net/api/0.1/game-servers/${TRACK_SERVER_ID}`,
    { headers: DH_HEADERS }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const {
    name,
    game,
    location,
    status,
    on,
  } = await res.json();

const fields = [
  { name: "Game", value: String(game).toUpperCase(), inline: true },
  { name: "Local", value: formatLocation(location), inline: true },
  { name: "Status", value: on ? "Online" : "Offline", inline: true },
  ...status
    .filter(
      (s) =>
        s.key !== "Players" &&
        s.value !== "0" &&
        s.value !== 0
    )
    .map((s) => ({
      name: s.key,
      value: s.value,
      inline: true,
    })),
  // Adiciona o campo Last Update antes do campo Conectar
  { name: "Last Update", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: false },
  { name: "Conectar", value: "`connect lanches.dat.gg:25403`", inline: false },
];

  // Define a cor do embed conforme o status
  const embedColor = on ? "Green" : "Red";

  return new EmbedBuilder()
    .setTitle(`🖥️ ${name}`)
    .addFields(fields)
    .setColor(embedColor)
    .setFooter({ text: `Atualiza a cada ${TRACK_INTERVAL_SEC}s` });
}

async function startTracking() {
  const canal = await client.channels.fetch(TRACK_CHANNEL_ID);
  if (!canal?.isTextBased())
    return console.error("Canal inválido ou sem permissão");

  // envia embed inicial
  const msg = await canal.send({ embeds: [await buildEmbed()] });

  // agenda updates
  setInterval(async () => {
    try {
      await msg.edit({ embeds: [await buildEmbed()] });
    } catch (err) {
      console.error("Erro ao atualizar embed:", err);
    }
  }, Number(TRACK_INTERVAL_SEC) * 1000);
}

client.once("ready", () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
  startTracking().catch((err) =>
    console.error("Falha ao iniciar tracking:", err)
  );
});

client.login(DISCORD_TOKEN);