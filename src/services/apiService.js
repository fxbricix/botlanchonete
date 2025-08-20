import { config } from '../config/index.js';

/**
 * Busca dados do servidor DatHost
 * @returns {Promise<Object>} Dados do servidor
 */
export async function fetchServerData() {
  // Monta cabeçalho Basic Auth para DatHost
  const dhToken = btoa(`${config.DAT_HOST_EMAIL}:${config.DAT_HOST_PASSWORD}`);

  console.log("Fazendo requisição para DatHost...");

  // URL para requisição (usa proxy em desenvolvimento e produção)
  const isDev = import.meta.env.DEV;

  let apiUrl;
  let headers;

  if (isDev) {
    // Desenvolvimento: usa proxy do Vite
    apiUrl = `/api/0.1/game-servers/${config.TRACK_SERVER_ID}`;
    headers = {
      Authorization: `Basic ${dhToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else {
    // Produção: usar um proxy CORS diferente
    apiUrl = `https://corsproxy.io/?${encodeURIComponent(
      `https://dathost.net/api/0.1/game-servers/${config.TRACK_SERVER_ID}`
    )}`;
    headers = {
      Authorization: `Basic ${dhToken}`,
      Accept: "application/json",
    };
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
    mode: "cors",
  });

  console.log("Resposta recebida:", response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta:", errorText);
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Busca dados dos ranques
 * @returns {Promise<Array>} Lista de ranques
 */
export async function fetchRanksData() {
  const response = await fetch(config.PLAYER_API_URL, { method: "GET" });
  
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${text}`);
  }
  
  // Remove caracteres inválidos antes do JSON
  const jsonStart = text.indexOf("[");
  const cleanText = jsonStart >= 0 ? text.slice(jsonStart) : text;
  
  try {
    const data = JSON.parse(cleanText);
    return Array.isArray(data) ? data : [data];
  } catch (e) {
    throw new Error(`Resposta inválida da API: ${e.message} - ${cleanText}`);
  }
}
