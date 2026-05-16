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
  {console.log("Consultando RANK DB:")}
  const response = await fetch(config.PLAYER_API_URL, { method: "GET" });
  
  const text = await response.text();
  if (!response.ok) {
    {console.log("Erro na requisiçao: STATUS: ", response.status)}
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${text}`);
  }
  {console.log("Recebido com sucesso")}
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

/**
 * Busca as últimas partidas usando host configurado no .env
 * @returns {Promise<Object>} Últimas partidas agrupadas por matchid
 */
export async function fetchLastMatches() {
  const host = config.LAST_MATCHES_HOST;
  if (!host) {
    throw new Error("VITE_LAST_MATCHES_HOST não configurado");
  }

  const url = new URL("/last-matches", host);
  url.searchParams.set("quantidade", "5");

  const response = await fetch(url.toString(), {
    method: "GET",
    mode: "cors",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
  }

  // Ler como texto e tentar parse robusto (algumas APIs retornam prefixo inesperado)
  const text = await response.text();
  try {
    const jsonStart = text.indexOf("{");
    const cleanText = jsonStart >= 0 ? text.slice(jsonStart) : text;
    const data = JSON.parse(cleanText);
    return data;
  } catch (e) {
    // Logar conteúdo para diagnóstico
    console.error("fetchLastMatches: falha ao parsear JSON:", e, "raw:", text);
    throw new Error(`Resposta inválida de last-matches: ${e.message}`);
  }
}
