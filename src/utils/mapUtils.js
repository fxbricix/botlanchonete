import { AVAILABLE_MAPS } from '../config/index.js';

/**
 * Gera a URL da imagem do mapa
 * @param {string} mapName - Nome do mapa
 * @returns {string|null} URL da imagem ou null
 */
export function getMapImageUrl(mapName) {
  if (!mapName) return null;

  const normalizedMapName = mapName.toLowerCase();

  // Primeiro tenta encontrar o mapa exato na lista
  const exactMatch = AVAILABLE_MAPS.find(
    (map) =>
      map.toLowerCase().replace(".png", "") === normalizedMapName ||
      map.toLowerCase().replace(".png", "").replace("de_", "") === normalizedMapName
  );

  if (exactMatch) {
    return `/botlanchonete/imgs/${exactMatch}`;
  }

  // Se não encontrar, tenta com prefixo de_
  const withPrefix = AVAILABLE_MAPS.find(
    (map) => map.toLowerCase().replace(".png", "") === `de_${normalizedMapName}`
  );

  if (withPrefix) {
    return `/botlanchonete/imgs/${withPrefix}`;
  }

  return `/botlanchonete/imgs/not_found.png`;
}
