/**
 * Configurações da aplicação
 */
export const config = {
  DAT_HOST_EMAIL: import.meta.env.VITE_DAT_HOST_EMAIL,
  DAT_HOST_PASSWORD: import.meta.env.VITE_DAT_HOST_PASSWORD,
  TRACK_SERVER_ID: import.meta.env.VITE_TRACK_SERVER_ID,
  TRACK_INTERVAL_SEC: import.meta.env.VITE_TRACK_INTERVAL_SEC || 30,
  SERVER_IP: import.meta.env.VITE_SERVER_IP || "lanches.dat.gg:26088",
  PLAYER_API_URL: import.meta.env.VITE_PLAYER_API_URL || "https://api-tabela-mixlanches.onrender.com/",
  LAST_MATCHES_HOST: import.meta.env.VITE_LAST_MATCHES_HOST || "",
};

/**
 * Verifica se as configurações necessárias estão presentes
 */
export const isConfigured = () =>
  config.DAT_HOST_EMAIL && config.DAT_HOST_PASSWORD && config.TRACK_SERVER_ID;

/**
 * Lista de mapas disponíveis
 */
export const AVAILABLE_MAPS = [
  "de_ancient.png",
  "de_anubis.png", 
  "de_cbble.png",
  "de_dust2.png",
  "de_inferno.png",
  "de_mirage.png",
  "de_nuke.png",
  "de_overpass.png",
  "de_train.png",
  "de_vertigo.png",
  "de_ancient_night.png",
  "de_cache.png",
  "de_dust_hr.png",
  "de_aztec_hr.png",
  "de_piranesi.png"
];
